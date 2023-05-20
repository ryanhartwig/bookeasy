"use client";
import React, { createContext, useContext } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import { APPOINTMENT_DATA_FRAGMENT } from "@/utility/queries/fragments/appointmentFragments";
import { BUSINESS_CLIENT_FRAGMENT } from "@/utility/queries/fragments/clientFragments";
import { SERVICE_FRAGMENT } from "@/utility/queries/fragments/serviceFragments";
import { SessionProvider, useSession } from 'next-auth/react';

const UserContext = React.createContext({})

const UserProvider = ({children}: { children: React.ReactNode}) => {
	const { data: session } = useSession();

	return (
		<UserContext.Provider value={{ id: session?.user.id}}>
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

