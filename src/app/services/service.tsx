'use client';

import styles from './services.module.scss';
import { Service } from "@/types/Service"

import { BsFillCameraVideoFill } from 'react-icons/bs';
import { ServiceUser } from '@/utility/functions/fetch_old/getServiceUsers';
import { Avatar } from '@/components/UI/Avatar/Avatar';
import { useEffect, useState } from 'react';

import { getClient } from '@/utility/functions/getClient';
import { gql, useQuery } from '@apollo/client';

export const query = gql`
  query GetServiceUsers($id: ID!) {
    service(by: {id: $id}){
      assignedUsers(first: 100){
        edges {
          node {
            id
            name
            avatar
          }
        }
      }
    }
  }
`

export default function ServiceCard({service, edit}: { service: Service, edit?: boolean}) {
  const [assignees, setAssignees] = useState<ServiceUser[]>([]);

  const client = getClient();
  const { data, loading, error } = useQuery(query, { 
    client, 
    variables: { 
      id: service.id 
    }, 
    context: {
      fetchOptions: {
        next: {
          revalidate: 5
        }
      }
    }
  });

  useEffect(() => {
    if (!data || loading) return;
    if (data.service === null) return setAssignees([]);
    
    const { assignedUsers } = data.service;
    setAssignees(assignedUsers.edges.map((edge: any) => ({id: edge.node.id, name: edge.node.name, avatar: edge.node.avatar} as ServiceUser)))
  }, [data, error, loading]);
   
  return error ? <p>{JSON.stringify(error.message)}</p> : (
    <div className={styles.service} style={{borderLeftColor: service.color}}>
      {service.isVideo && 
      <div className={styles.video}>
        <BsFillCameraVideoFill size={16} />
      </div>}
      <p>{service.name}</p>
      <p>{service.duration} min</p>
      <p>{service.provider}</p>
      <div className={styles.assignees}>
        {assignees.map(user => 
          <div key={user.id}>
            <Avatar src={user.avatar} size={26} />
            <p>{user.name}</p>
          </div>
        )}
      </div>
      <p>${service.cost.toFixed(2)}</p>
      {edit && <p className={styles.edit}>Edit</p>}
    </div>
  )
}