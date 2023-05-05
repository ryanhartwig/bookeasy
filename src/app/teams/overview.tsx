'use client';

import { Business } from "@/types/Business"
import styles from './teams.module.scss';
import Image from 'next/image';
import teamDefault from '../../../public/assets/team_default.png';
import { Client } from "@/types/Client";
import { Service } from "@/types/Service";
import { BusinessUser, User } from "@/types/User";

interface OverviewProps {
  selected: Business,
  members: BusinessUser[],
  clients: Client[],
  services: Service[],
}

export const Overview: React.FC<OverviewProps> = ({selected, members, clients, services}) => {

  return (
    <>
      <Image src={teamDefault} width={139} alt='Add team icon' />
      <h2>{selected.name}</h2>
      <hr />
      <div>
        <div>
          <p>{members.length}</p>
          <p>member(s)</p>
        </div>
        <div>
          <p>{clients.length}</p>
          <p>client(s)</p>
        </div>
        <div>
          <p>{services.length}</p>
          <p>service(s)</p>
        </div>
      </div>
    </>
  )
}