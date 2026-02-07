export default function SolicitudLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-16">
      {children}
    </div>
  );
}
