import Image from "next/image";
import Link from "next/link";
import { projects } from "@/app/data/search-content";
import { StructuredData } from "@/app/components/StructuredData";
export const metadata = {
  title: "Selected Website Projects",
  description:
    "Explore Grid & Logic’s work with Pixel Nest and Zaka Engineering, including agency websites, workflow tools, and product catalogues.",
  alternates: { canonical: "/work/" },
  openGraph: {
    title: "Selected projects | Grid & Logic",
    description: "Website, workflow, and catalogue projects by Grid & Logic.",
    url: "/work/",
  },
};
export default function Work() {
  return (
    <main id="main">
      <StructuredData
        page={{
          path: "/work/",
          name: "Selected projects",
          type: "CollectionPage",
        }}
      />
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / Work
          </div>
          <h1>Our work, in context.</h1>
          <p>
            A closer look at the scope of our collaborations with Pixel Nest and
            Zaka Engineering.
          </p>
        </div>
      </section>
      <section className="section wrap">
        <div className="project-grid">
          {projects.map((p) => (
            <article className="project" key={p.slug}>
              <a href={`/work/${p.slug}/`}>
                <Image
                  className="case-image"
                  src={`/assets/${p.image}`}
                  width="1440"
                  height="1000"
                  alt={`${p.name} website preview`}
                  sizes="(max-width: 760px) 90vw, 48vw"
                  loading="lazy"
                />
                <h2>{p.name} ↗</h2>
              </a>
              <p>{p.description}</p>
              <a className="text-link" href={`/work/${p.slug}/`}>
                Explore the project ↗
              </a>
            </article>
          ))}
        </div>
        <p style={{ marginTop: 40 }}>
          Looking for more examples?{" "}
          <Link className="text-link" href="/#samples">
            Try our sample websites ↗
          </Link>{" "}
          or{" "}
          <Link className="text-link" href="/#work">
            explore our 3D project images ↗
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
