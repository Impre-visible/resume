const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()
const PORT = 3000
const BACKEND_DIR = "/"
const RESUME_DIR = process.env.RESUME_DIR || '/usr/share/nginx/html/assets/resume'
const PASSCODE = process.env.PASSCODE
const DEFAULT_LANG = process.env.DEFAULT_LANG || 'fr'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // <-- Ajouté

const upload = multer({ dest: '/tmp' }) // upload temporaire

// Auth middleware
function checkPasscode(req, res, next) {
    const pass = req.headers['x-passcode'] || req.body.passcode
    if (!PASSCODE || pass !== PASSCODE) return res.status(401).json({ error: 'Unauthorized' })
    next()
}

const cleanDefaultResume = () => {
    const file = path.join(RESUME_DIR, "en", "temp_resume.json")
    if (fs.existsSync(file)) {
        fs.unlink(file, (err) => {
            if (err) console.error('Error deleting default resume:', err)
            else console.log('Default resume deleted successfully')
        })
    }
}

// Upload CV (champ: resume)
app.post('/api/resume', checkPasscode, upload.single('resume'), (req, res) => {
    cleanDefaultResume()
    const lang = req.body.lang || req.query.lang || DEFAULT_LANG
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

    const dir = path.join(RESUME_DIR, lang)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    const timestamp = Date.now()
    const ext = path.extname(req.file.originalname) || '.json'
    const filename = `resume.${lang}.${timestamp}${ext}`
    const destPath = path.join(dir, filename)

    // Utilise copyFile + unlink pour éviter EXDEV
    fs.copyFile(req.file.path, destPath, (copyErr) => {
        if (copyErr) {
            console.error('Copy error:', copyErr)
            return res.status(500).json({ error: 'Upload failed', details: copyErr.message })
        }
        fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Unlink error:', unlinkErr)
                // On considère l'upload comme réussi même si le fichier temporaire n'est pas supprimé
            }
            res.json({ message: 'File uploaded successfully', file: filename })
        })
    })
})

// Liste des CV pour une langue
app.get('/api/resume/list', (req, res) => {
    const lang = req.query.lang || DEFAULT_LANG
    const dir = path.join(RESUME_DIR, lang)
    if (!fs.existsSync(dir)) return res.json({ files: [] })
    const files = fs.readdirSync(dir)
        .filter(f => f.startsWith(`resume.${lang}.`) && f.endsWith('.json'))
        .sort()
    res.json({ files })
})

// Dernier CV pour une langue
app.get('/api/resume/latest', (req, res) => {
    const lang = req.query.lang || DEFAULT_LANG
    const dir = path.join(RESUME_DIR, lang)
    if (!fs.existsSync(dir)) return res.sendFile(path.join(BACKEND_DIR, "assets", "temp_resume.json"))
    const files = fs.readdirSync(dir)
        .filter(f => f.startsWith(`resume.${lang}.`) && f.endsWith('.json'))
        .sort()
        .reverse()
    if (!files.length) return res.sendFile(path.join(BACKEND_DIR, "assets", "temp_resume.json"))
    res.sendFile(path.join(dir, files[0]))
})

app.get('/api/languages', (req, res) => {
    const dir = RESUME_DIR
    if (!fs.existsSync(dir)) return res.json({ languages: [] })
    const languages = fs.readdirSync(dir)
        .filter(f => fs.statSync(path.join(dir, f)).isDirectory())
        .sort()
    res.json({ languages })
})

app.get('/api/versions', (req, res) => {
    let lang = req.query.lang || DEFAULT_LANG
    const dir = path.join(RESUME_DIR, lang)
    if (!fs.existsSync(dir)) return res.json({ versions: [] })
    const versions = fs.readdirSync(dir)
        .filter(f => f.startsWith(`resume.${lang}.`) && f.endsWith('.json'))
        .sort()
        .reverse()
    res.json({ versions })
})

const getLatestResume = (_req, res, lang) => {
    const dir = path.join(RESUME_DIR, lang)
    if (!fs.existsSync(dir)) return res.sendFile(path.join(BACKEND_DIR, "assets", "temp_resume.json"))
    const files = fs.readdirSync(dir)
        .filter(f => f.startsWith(`resume.${lang}.`) && f.endsWith('.json'))
        .sort()
        .reverse()
    if (!files.length) return res.sendFile(path.join(BACKEND_DIR, "assets", "temp_resume.json"))
    filename = files[0]
    return res.sendFile(path.join(dir, filename))
}

app.get('/api/resume', (req, res) => {
    let filename = req.query.filename

    if (!filename || filename.split('.').length < 3) {
        const lang = req.query.lang || DEFAULT_LANG
        return getLatestResume(req, res, lang)
    }

    let lang = filename.split('.')[1]

    console.log('filename:', filename)
    console.log('path:', path.join(RESUME_DIR, lang, filename))
    console.log('exists:', fs.existsSync(path.join(RESUME_DIR, lang, filename)))

    const filePath = path.join(RESUME_DIR, lang, filename)
    if (!fs.existsSync(filePath)) return getLatestResume(req, res, lang)

    res.sendFile(filePath)
})

// Télécharger un CV spécifique
app.get('/api/resume/download', (req, res) => {
    const filename = req.query.filename
    if (!filename || filename.split('.').length < 3) {
        return res.status(400).json({ error: 'Missing or invalid filename' })
    }
    const lang = filename.split('.')[1]
    const filePath = path.join(RESUME_DIR, lang, filename)
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' })
    }
    res.download(filePath, filename)
})

// Supprimer un CV spécifique (auth requis)
app.delete('/api/resume/delete', checkPasscode, (req, res) => {
    const filename = req.query.filename
    if (!filename || filename.split('.').length < 3) {
        return res.status(400).json({ error: 'Missing or invalid filename' })
    }
    const lang = filename.split('.')[1]
    const filePath = path.join(RESUME_DIR, lang, filename)
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' })
    }
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Delete error:', err)
            return res.status(500).json({ error: 'Delete failed', details: err.message })
        }
        res.json({ message: 'File deleted successfully', file: filename })
    })
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend listening on 0.0.0.0:${PORT}`)
})
