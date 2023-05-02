"use client";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import { APPOINTMENT_DATA_FRAGMENT } from "@/utility/queries/fragments/appointmentFragments";
import { BUSINESS_CLIENT_FRAGMENT } from "@/utility/queries/fragments/clientFragments";
import { SERVICE_FRAGMENT } from "@/utility/queries/fragments/serviceFragments";

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
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};