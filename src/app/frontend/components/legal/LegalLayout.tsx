export default function LegalLayout({ title, lastUpdated, children }: any) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-600">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <article className="bg-white rounded-lg shadow-sm p-8 prose prose-zinc prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline max-w-none">
          {children}
        </article>
      </div>
    </div>
  );
}