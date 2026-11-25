import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site py-28 text-center">
      <p className="kicker justify-center">404</p>
      <h1 className="mt-4 text-[2.6rem]">This page isn’t here</h1>
      <p className="mt-4 text-muted">It may have moved. Try the home page.</p>
      <Link prefetch={false} href="/en" className="btn btn-yellow mt-8">Home</Link>
    </section>
  );
}
