"use client";
import React, { createContext, useContext } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import { APPOINTMENT_DATA_FRAGMENT } from "@/utility/queries/fragments/appointmentFragments";
import { BUSINESS_CLIENT_FRAGMENT } from "@/utility/queries/fragments/clientFragments";
import { SERVICE_FRAGMENT } from "@/utility/queries/fragments/serviceFragments";
import { SessionProvider, useSession } from 'next-auth/react';
import { BUSINESS_FRAGMENT } from "@/utility/queries/fragments/businessFragments";
import { User } from "@/types/User";
import { GET_USER } from "@/utility/queries/userQueries";

const UserContext = createContext<{id: string} | User>({ id: '' })

const UserProvider = ({children}: { children: React.ReactNode}) => {
	const { data: session } = useSession();
	const { data: userData } = useQuery(GET_USER, { variables: { userId: session?.user.id }, skip: !session?.user.id})

	return (
		<UserContext.Provider value={userData?.getUser ? userData.getUser : { id: session?.user.id || ''}}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => useContext(UserContext);

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const client = new ApolloClient({
		uri: "http://localhost:3000/graphql",
		cache: new InMemoryCache({
			fragments: createFragmentRegistry(gql`
				${APPOINTMENT_DATA_FRAGMENT}
				${BUSINESS_CLIENT_FRAGMENT}
				${SERVICE_FRAGMENT}
				${BUSINESS_FRAGMENT}
			`)
		}),
	});
	return (
		<ApolloProvider client={client}>
			<SessionProvider>
				<UserProvider>
					{children}
				</UserProvider>
			</SessionProvider>
		</ApolloProvider>
	);
};

