import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Collection from "@/components/ui/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import Search from "@/components/ui/shared/Search";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/ui/shared/CategoryFilter";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })


  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern 
      bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2
        2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Wejdź, zarezerwuj, korzystaj. Wszystko w jednym miejscu.</h1>
            <p className="p-regular-20 md:p-regular-24">Odkryj magię nocy saunowych i urok luksusowego wypoczynku w Tarninowym Wzgórzu. Zarezerwuj swój idealny pobyt i zanurz się w spokojnej harmonii natury oraz wyjątkowej gościnności.</p>
            <Button size="lg" asChild className="button bg-customGreen hover:bg-customGreen2 w-full sm:w-fit">
              <Link href="#events">
                Odkryj
              </Link>
            </Button>
          </div>

          <Image 
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center
            2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col
      gap-8 md:gap-12">
        <h2 className="h2-bold">
          Zaufało nam <br /> tysiące klientów.
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection 
          data={events?.data}
          emptyTitle="Brak dostępnych wydarzeń"
          emptyStateSubtext="Odwiedź nas ponownie za jakiś czas"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
