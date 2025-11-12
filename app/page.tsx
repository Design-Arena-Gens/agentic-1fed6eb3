import ImageShowcase from "./components/ImageShowcase";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_-10%,rgba(4,217,255,0.25),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 blur-3xl opacity-50" style={{
        background: "radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.35), transparent 60%), radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.25), transparent 65%)",
      }} />
      <ImageShowcase />
    </main>
  );
}
