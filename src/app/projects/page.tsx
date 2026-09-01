import { Suspense } from "react";
import { ProjectLibrary } from "../components/projects-library";

export default function ProjectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectLibrary />
    </Suspense>
  );
}
