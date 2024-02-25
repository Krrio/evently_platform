import { Button } from '@/components/ui/button'
import Collection from '@/components/ui/shared/Collection'
import { getAllEvents, getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.action'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;


    const orders = await getOrdersByUser({ userId, page: ordersPage })

    const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
    const organizedEvents = await getEventsByUser({ userId, page: eventsPage })


  return (
    <>
        {/* {My Tickets} */}
        <section className="bg-primary-50 bg-dotted-pattern 
        bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center 
            sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">Moje bilety</h3>
                <Button asChild
                size="lg"
                className="button hidden bg-customGreen hover:bg-customGreen2 sm:flex"
                >
                    <Link
                        href="/#events"
                    >
                        Odkryj więcej wydarzeń  
                    </Link>
                </Button>
            </div>
        </section>

        <section className="wrapper my-8">
            <Collection 
                data={orderedEvents}
                emptyTitle="Brak posiadanych biletów na obecne wydarzenia"
                emptyStateSubtext="Nie martw się - mnóstwo wydarzeń 
                ciągle na Ciebie czeka"
                collectionType="My_Tickets"
                limit={3}
                page={ordersPage}
                urlParamName="ordersPage"
                totalPages={orders?.totalPages}
            />
        </section>

        {/* Events Organized */}

        <section className="bg-primary-50 bg-dotted-pattern 
        bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center 
            sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">Wydarzenia zorganizowane przeze mnie</h3>
                <Button asChild
                size="lg"
                className="button hidden bg-customGreen hover:bg-customGreen2 sm:flex"
                >
                    <Link
                        href="/events/create"
                    >
                        Stwórz nowe wydarzenie
                    </Link>
                </Button>
            </div>
        </section>

        <section className="wrapper my-8">
            <Collection 
                data={organizedEvents?.data}
                emptyTitle="Brak utworzonych wydarzeń"
                emptyStateSubtext="Nie martw się - możesz stworzyć je w dowolnym momencie"
                collectionType="Events_Organized"
                limit={3}
                page={eventsPage}
                urlParamName="eventsPage"
                totalPages={organizedEvents?.totalPages}
            />
        </section>
    </>
  )
}

export default ProfilePage