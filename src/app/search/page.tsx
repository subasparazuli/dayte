import { SearchPageClient } from "@/components/search/search-page-client"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  
  // In Next.js 15+, searchParams is a Promise, so we must await it.
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      <SearchPageClient searchParams={params} />
    </div>
  )
}
