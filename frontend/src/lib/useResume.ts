interface ResumeV3 {
	basics: {
		name: string;
		headline: string;
		email: string;
		phone: string;
		location: string;
		url: { label: string; href: string };
		customFields: { id: string; icon: string; name: string; value: string }[];
		picture: {
			url: string;
			size: number;
			aspectRatio: number;
			borderRadius: number;
			effects: { hidden: boolean; border: boolean; grayscale: boolean };
		};
	};
	metadata: Record<string, unknown>;
	sections: {
		education: {
			name: string;
			items: {
				id: string;
				institution: string;
				date: string;
				studyType: string;
				area: string;
				score: string;
				summary: string;
				visible: boolean;
				url: { label: string; href: string };
			}[];
		};
		experience: {
			name: string;
			items: {
				id: string;
				company: string;
				position: string;
				date: string;
				summary: string;
				visible: boolean;
				url: { label: string; href: string };
			}[];
		};
		languages: {
			name: string;
			items: {
				id: string;
				name: string;
				description: string;
				level: number;
				visible: boolean;
			}[];
		};
		skills: {
			name: string;
			items: {
				id: string;
				name: string;
				description: string;
				level: number;
				visible: boolean;
				keywords: string[];
			}[];
		};
		interests: {
			name: string;
			items: {
				id: string;
				name: string;
				keywords: string[];
				visible: boolean;
			}[];
		};
		projects: {
			name: string;
			items: {
				id: string;
				name: string;
				date: string;
				description: string;
				summary: string;
				keywords: string[];
				visible: boolean;
				url: { label: string; href: string };
			}[];
		};
		profiles: {
			name: string;
			items: {
				id: string;
				network: string;
				username: string;
				icon: string;
				url: { label: string; href: string };
				visible: boolean;
			}[];
		};
		[key: string]: unknown;
	};
}

export interface ResumeV4 {
	basics: {
		name: string;
		headline: string;
		email: string;
		phone: string;
		location: string;
		website: { url: string; label: string };
		customFields: { id: string; icon: string; text: string; link: string }[];
		picture:
			| undefined
			| {
					hidden: boolean;
					url: string;
					size: number;
					rotation: number;
					aspectRatio: number;
					borderRadius: number;
					borderColor: string;
					borderWidth: number;
					shadowColor: string;
					shadowWidth: number;
			  };
	};
	metadata: Record<string, unknown>;
	sections: {
		education: {
			title: string;
			columns: number;
			hidden: boolean;
			items: {
				id: string;
				hidden: boolean;
				school: string;
				degree: string;
				area: string;
				grade: string;
				location: string;
				period: string;
				website: { url: string; label: string; inlineLink: boolean };
				description: string;
			}[];
		};
		experience: {
			title: string;
			columns: number;
			hidden: boolean;
			items: {
				id: string;
				hidden: boolean;
				company: string;
				position: string;
				location: string;
				period: string;
				website: { url: string; label: string; inlineLink: boolean };
				description: string;
				roles: string[];
			}[];
		};
		languages: {
			title: string;
			columns: number;
			hidden: boolean;
			items: {
				id: string;
				hidden: boolean;
				language: string;
				fluency: string;
				level: number;
			}[];
		};
		skills: {
			title: string;
			columns: number;
			hidden: boolean;
			items: {
				id: string;
				hidden: boolean;
				icon: string;
				iconColor: string;
				name: string;
				proficiency: string;
				level: number;
				keywords: string[];
			}[];
		};
		interests: {
			title: string;
			columns: number;
			hidden: boolean;
			items: {
				id: string;
				hidden: boolean;
				icon: string;
				iconColor: string;
				name: string;
				keywords: string[];
			}[];
		};
		projects: {
			title: string;
			columns: number;
			hidden: boolean;
			items: {
				id: string;
				hidden: boolean;
				name: string;
				period: string;
				website: { url: string; label: string; inlineLink: boolean };
				description: string;
			}[];
		};
		profiles: {
			title: string;
			columns: number;
			hidden: boolean;
			items: {
				id: string;
				hidden: boolean;
				icon: string;
				iconColor: string;
				network: string;
				username: string;
				website: { url: string; label: string; inlineLink: boolean };
			}[];
		};
		awards?: {
			title: string;
			columns: number;
			hidden: boolean;
			items: unknown[];
		};
		certifications?: {
			title: string;
			columns: number;
			hidden: boolean;
			items: unknown[];
		};
		publications?: {
			title: string;
			columns: number;
			hidden: boolean;
			items: unknown[];
		};
		volunteer?: {
			title: string;
			columns: number;
			hidden: boolean;
			items: unknown[];
		};
		references?: {
			title: string;
			columns: number;
			hidden: boolean;
			items: unknown[];
		};
		[key: string]: unknown;
	};
}

export type Resume = ResumeV3;

type AnyRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is AnyRecord =>
	typeof value === "object" && value !== null;

const getString = (value: unknown, fallback = ""): string =>
	typeof value === "string" ? value : fallback;

const getNumber = (value: unknown, fallback = 0): number =>
	typeof value === "number" ? value : fallback;

const getBoolean = (value: unknown, fallback = false): boolean =>
	typeof value === "boolean" ? value : fallback;

const getArray = (value: unknown): unknown[] =>
	Array.isArray(value) ? value : [];

const normalizeUrl = (
	value: unknown,
	fallbackLabel = "",
): { label: string; href: string } => {
	if (!isRecord(value)) return { label: fallbackLabel, href: "" };

	return {
		label: getString(value.label, fallbackLabel),
		href: getString(value.href, getString(value.url)),
	};
};

const normalizeVisible = (value: AnyRecord): boolean => {
	if (typeof value.visible === "boolean") return value.visible;
	if (typeof value.hidden === "boolean") return !value.hidden;
	return true;
};

export function normalizeResume(data: unknown): Resume {
	const source = isRecord(data) ? data : {};
	const basicsSource = isRecord(source.basics) ? source.basics : {};
	const sectionsSource = isRecord(source.sections) ? source.sections : {};

	const pictureSource = isRecord(basicsSource.picture)
		? basicsSource.picture
		: undefined;
	const picture =
		pictureSource && !getBoolean(pictureSource.hidden)
			? {
					url: getString(pictureSource.url),
					size: getNumber(pictureSource.size, 64),
					aspectRatio: getNumber(pictureSource.aspectRatio, 1),
					borderRadius: getNumber(pictureSource.borderRadius),
					effects: {
						hidden: false,
						border: false,
						grayscale: false,
					},
				}
			: undefined;

	const mapItems = <T>(
		sectionValue: unknown,
		mapper: (item: AnyRecord, index: number) => T,
	) =>
		getArray(isRecord(sectionValue) ? sectionValue.items : undefined).map(
			(item, index) => mapper(isRecord(item) ? item : {}, index),
		);

	const titleFor = (sectionValue: unknown, fallback: string): string => {
		if (!isRecord(sectionValue)) return fallback;
		return getString(
			sectionValue.name,
			getString(sectionValue.title, fallback),
		);
	};

	return {
		basics: {
			name: getString(basicsSource.name),
			headline: getString(basicsSource.headline),
			email: getString(basicsSource.email),
			phone: getString(basicsSource.phone),
			location: getString(basicsSource.location),
			url: normalizeUrl(
				isRecord(basicsSource.website)
					? basicsSource.website
					: basicsSource.url,
				getString(
					isRecord(basicsSource.website)
						? basicsSource.website.label
						: undefined,
				),
			),
			customFields: getArray(basicsSource.customFields).map((field, index) => {
				const item = isRecord(field) ? field : {};

				return {
					id: getString(item.id, `custom-field-${index}`),
					icon: getString(item.icon),
					name: getString(item.name, getString(item.text)),
					value: getString(item.value, getString(item.link)),
				};
			}),
			picture: picture as Resume["basics"]["picture"],
		},
		metadata: isRecord(source.metadata) ? source.metadata : {},
		sections: {
			education: {
				name: titleFor(sectionsSource.education, "Education"),
				items: mapItems(sectionsSource.education, (item, index) => ({
					id: getString(item.id, `education-${index}`),
					institution: getString(item.institution, getString(item.school)),
					date: getString(item.date, getString(item.period)),
					studyType: getString(item.studyType, getString(item.degree)),
					area: getString(item.area),
					score: getString(item.score, getString(item.grade)),
					summary: getString(item.summary, getString(item.description)),
					visible: normalizeVisible(item),
					url: normalizeUrl(isRecord(item.website) ? item.website : item.url),
				})),
			},
			experience: {
				name: titleFor(sectionsSource.experience, "Experience"),
				items: mapItems(sectionsSource.experience, (item, index) => ({
					id: getString(item.id, `experience-${index}`),
					company: getString(item.company),
					position: getString(item.position),
					date: getString(item.date, getString(item.period)),
					summary: getString(item.summary, getString(item.description)),
					visible: normalizeVisible(item),
					url: normalizeUrl(isRecord(item.website) ? item.website : item.url),
				})),
			},
			languages: {
				name: titleFor(sectionsSource.languages, "Languages"),
				items: mapItems(sectionsSource.languages, (item, index) => ({
					id: getString(item.id, `language-${index}`),
					name: getString(item.name, getString(item.language)),
					description: getString(item.description, getString(item.fluency)),
					level: getNumber(item.level),
					visible: normalizeVisible(item),
				})),
			},
			skills: {
				name: titleFor(sectionsSource.skills, "Skills"),
				items: mapItems(sectionsSource.skills, (item, index) => ({
					id: getString(item.id, `skill-${index}`),
					name: getString(item.name),
					description: getString(item.description, getString(item.proficiency)),
					level: getNumber(item.level),
					visible: normalizeVisible(item),
					keywords: getArray(item.keywords).filter(
						(keyword): keyword is string => typeof keyword === "string",
					),
				})),
			},
			interests: {
				name: titleFor(sectionsSource.interests, "Interests"),
				items: mapItems(sectionsSource.interests, (item, index) => ({
					id: getString(item.id, `interest-${index}`),
					name: getString(item.name),
					keywords: getArray(item.keywords).filter(
						(keyword): keyword is string => typeof keyword === "string",
					),
					visible: normalizeVisible(item),
				})),
			},
			projects: {
				name: titleFor(sectionsSource.projects, "Projects"),
				items: mapItems(sectionsSource.projects, (item, index) => ({
					id: getString(item.id, `project-${index}`),
					name: getString(item.name),
					date: getString(item.date, getString(item.period)),
					description: getString(item.description),
					summary: getString(item.summary, getString(item.description)),
					keywords: getArray(item.keywords).filter(
						(keyword): keyword is string => typeof keyword === "string",
					),
					visible: normalizeVisible(item),
					url: normalizeUrl(isRecord(item.website) ? item.website : item.url),
				})),
			},
			profiles: {
				name: titleFor(sectionsSource.profiles, "Profiles"),
				items: mapItems(sectionsSource.profiles, (item, index) => ({
					id: getString(item.id, `profile-${index}`),
					network: getString(item.network),
					username: getString(item.username),
					icon: getString(item.icon),
					url: normalizeUrl(isRecord(item.website) ? item.website : item.url),
					visible: normalizeVisible(item),
				})),
			},
		},
	};
}
