import { loader } from "fumadocs-core/source";
import {
  Bot,
  Code,
  Database,
  FileCode,
  FileQuestion,
  GitFork,
  Key,
  Layers2,
  Layers3,
  Network,
  Play,
  Rocket,
  Server,
  ShieldCheck,
  ToyBrick,
  Wrench,
} from "lucide-static";
import { create, docs } from "../../source.generated";

const iconMap = {
  Bot,
  Code,
  Database,
  FileCode,
  FileQuestion,
  GitFork,
  Key,
  Layers2,
  Layers3,
  Network,
  Play,
  Rocket,
  Server,
  ShieldCheck,
  ToyBrick,
  Wrench,
};

export const source = loader({
  source: await create.sourceAsync(docs.doc, docs.meta),
  baseUrl: "/docs",
  icon(icon) {
    if (!icon) {
      return;
    }

    if (icon in iconMap) return iconMap[icon as keyof typeof iconMap];
  },
});
