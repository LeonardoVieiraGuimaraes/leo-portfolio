import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { useLanguage } from "../context/LanguageContext";

/** Endereço do hub dos projetos do doutorado (acesso aberto, sem login). */
export const HUB_DOUTORADO = "https://projetos-doutorado.leoproti.com.br";

type DoctorateProjectText = { title: string; description: string; layer: string };

type DoctorateProject = DoctorateProjectText & {
  path: string;
  icon: string;
  accent: string;
  en: Partial<DoctorateProjectText>;
};

const projects: DoctorateProject[] = [
  {
    title: "28 °C é quente? Lógica fuzzy",
    description:
      "Apresentação interativa com play: um controlador fuzzy de ventilador em 7 etapas, da fuzzificação ao centroide, calculado ao vivo.",
    layer: "Next.js · React · Canvas",
    path: "/logica-fuzzy",
    icon: "≈",
    accent: "#f97316",
    en: {
      title: "Is 28 °C hot? Fuzzy logic",
      description:
        "Interactive walkthrough with play: a fuzzy fan controller in 7 steps, from fuzzification to the centroid, computed live. Content in Portuguese.",
    },
  },
  {
    title: "Fuzzy e FCA",
    description:
      "ACFuzzy: risco fuzzy por GTA, reforço relacional por análise formal de conceitos (FCA) e ranking de auditoria.",
    layer: "Django Ninja",
    path: "/pratica-fuzzy-fca",
    icon: "◑",
    accent: "#14b8a6",
    en: {
      title: "Fuzzy and FCA",
      description:
        "ACFuzzy: fuzzy risk per animal transit permit (GTA), relational reinforcement through formal concept analysis (FCA) and an audit ranking.",
    },
  },
  {
    title: "Autômatos de Wolfram",
    description: "Evolução celular das regras 0 a 255, com a grade e o gráfico gerados no backend.",
    layer: "Django Ninja",
    path: "/pratica-automatos-wolfram",
    icon: "▦",
    accent: "#0ea5e9",
    en: {
      title: "Wolfram cellular automata",
      description: "Cellular evolution of rules 0 to 255, with the grid and chart generated on the backend.",
    },
  },
  {
    title: "Random Walk",
    description: "Caminhadas aleatórias 1D, deslocamento quadrático médio (MSD) e expoente de difusão por ajuste log-log.",
    layer: "Django Ninja",
    path: "/pratica-random-walk",
    icon: "〰",
    accent: "#8b5cf6",
    en: {
      description: "1D random walks, mean squared displacement (MSD) and the diffusion exponent from a log-log fit.",
    },
  },
  {
    title: "Grafo GTA",
    description: "Upload de planilha, métricas de rede com NetworkX e cálculo de RF, RN, Rrel e R(t+1).",
    layer: "Django Ninja · NetworkX",
    path: "/pratica-grafo-gta",
    icon: "⬡",
    accent: "#6366f1",
    en: {
      title: "GTA graph",
      description: "Spreadsheet upload, network metrics with NetworkX and the RF, RN, Rrel and R(t+1) indicators.",
    },
  },
  {
    title: "Motor Antifraude",
    description: "Score de risco em tempo real, abaixo de 300 ms, com decisão explicável por fatores SHAP.",
    layer: "Django REST Framework",
    path: "/motor-antifraude",
    icon: "⚡",
    accent: "#f59e0b",
    en: {
      title: "Fraud detection engine",
      description: "Real-time risk score under 300 ms, with decisions explained by SHAP factors.",
    },
  },
];

export default function Doctorate() {
  const { t } = useLanguage();

  return (
    <section className="page-section" id="doutorado">
      <div className="section-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow">{t("Doutorado · CEFET-MG", "Ph.D. · CEFET-MG")}</p>
            <h1 className="section-title">{t("Projetos do doutorado", "Ph.D. projects")}</h1>
            <p className="section-copy">
              {t(
                "Práticas e experimentos do doutorado em Modelagem Matemática e Computacional, rodando no meu servidor: Next.js no front e uma API Django com Ninja e DRF. O acesso é aberto, sem login.",
                "Practical work and experiments from my Ph.D. in Mathematical and Computational Modeling, running on my own server: Next.js on the front end and a Django API with Ninja and DRF. Access is open, no login required."
              )}
            </p>
          </div>
          <a href={HUB_DOUTORADO} target="_blank" rel="noopener noreferrer" className="project-link">
            {t("Abrir o hub de projetos", "Open the projects hub")}
            <HiArrowTopRightOnSquare className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((entry) => t(entry, { ...entry, ...entry.en })).map((project) => (
            <a
              key={project.path}
              href={`${HUB_DOUTORADO}${project.path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1"
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 opacity-80" style={{ background: project.accent }} />
              <div className="flex items-start justify-between gap-3">
                <span
                  aria-hidden
                  className="grid h-12 w-12 place-items-center rounded-xl text-2xl"
                  style={{ background: `${project.accent}22`, color: project.accent }}
                >
                  {project.icon}
                </span>
                <span className="tech-chip">{project.layer}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white [.light_&]:text-slate-950">{project.title}</h2>
                <p className="mt-3 text-sm leading-6 muted-text">{project.description}</p>
              </div>
              <span className="project-link">
                {t("Abrir projeto", "Open project")}
                <HiArrowTopRightOnSquare className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
