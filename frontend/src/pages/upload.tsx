import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Download, Trash2 } from "lucide-react";

const langs = [
	{ label: "Français", value: "fr", emoji: "🇫🇷" },
	{ label: "English", value: "en", emoji: "🇬🇧" },
	{ label: "Español", value: "es", emoji: "🇪🇸" },
	{ label: "Deutsch", value: "de", emoji: "🇩🇪" },
	{ label: "Italiano", value: "it", emoji: "🇮🇹" },
	{ label: "Português", value: "pt", emoji: "🇧🇷" },
	{ label: "Nederlands", value: "nl", emoji: "🇳🇱" },
	{ label: "Русский", value: "ru", emoji: "🇷🇺" },
];

export default function ResumeAdmin() {
	const [file, setFile] = useState<File | null>(null);
	const [lang, setLang] = useState("fr");
	const [passcode, setPasscode] = useState("");
	const [history, setHistory] = useState<string[]>([]);

	const fetchHistory = async () => {
		const res = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/api/resume/list?lang=${lang}`,
		);
		const data = await res.json();
		setHistory(data.files);
	};

	const handleUpload = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) return;
		const formData = new FormData();
		formData.append("resume", file);
		formData.append("lang", lang);
		formData.append("passcode", passcode);
		const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/resume`, {
			method: "POST",
			headers: { "x-passcode": passcode },
			body: formData,
		});
		if (res.ok) {
			toast.success("Upload successful");
			fetchHistory();
		} else {
			const error = await res.json();
			toast.error(`Upload failed: ${error.message}`);
		}
	};

	const handleDownload = async (filename: string) => {
		const res = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/api/resume/download?filename=${filename}`,
		);
		if (!res.ok) {
			toast.error("Download failed");
			return;
		}
		const blob = await res.blob();
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
		toast.success("Download successful");
	};

	const handleDelete = async (filename: string) => {
		const res = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/api/resume/delete?filename=${filename}`,
			{
				method: "DELETE",
				headers: { "x-passcode": passcode },
			},
		);
		if (res.ok) {
			toast.success("Delete successful");
			setHistory((prev) => prev.filter((f) => f !== filename));
		} else {
			const error = await res.json();
			toast.error(`Delete failed: ${error.message}`);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: trust
	useEffect(() => {
		fetchHistory();
	}, [lang]);

	return (
		<section className="h-screen w-screen flex items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Upload CV</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleUpload} className="flex flex-col gap-4">
						<Input
							type="file"
							accept="application/json"
							onChange={(e) => setFile(e.target.files?.[0] || null)}
						/>
						<Select value={lang} onValueChange={setLang}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select Language" />
							</SelectTrigger>
							<SelectContent>
								{langs.map((l) => (
									<SelectItem key={l.value} value={l.value}>
										{l.emoji} {l.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Input
							type="password"
							value={passcode}
							onChange={(e) => setPasscode(e.target.value)}
							placeholder="Password"
						/>
						<Button type="submit">Upload</Button>
					</form>
					<div className="mt-4">
						<h3 className="font-semibold">History</h3>
						<ul className="text-sm list-disc pl-5">
							{history.map((f) => (
								<li
									key={f}
									className="flex flex-row items-center justify-between"
								>
									{f}
									<section className="flex flex-row items-center justify-end">
										<Button
											variant="outline"
											className="ml-2"
											onClick={() => handleDownload(f)}
										>
											<Download className="w-4 h-4" />
										</Button>
										<Button
											variant="outline"
											className="ml-2"
											onClick={() => handleDelete(f)}
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</section>
								</li>
							))}
						</ul>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
