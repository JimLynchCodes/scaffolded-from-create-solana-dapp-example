// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import ProjectIDL from '../target/idl/project.json'
import type { Project } from '../target/types/project'

// Re-export the generated IDL and type
export { Project, ProjectIDL }

// The programId is imported from the program IDL.
export const PROJECT_PROGRAM_ID = new PublicKey(ProjectIDL.address)

// This is a helper function to get the Project Anchor program.
export function getProjectProgram(provider: AnchorProvider) {
  return new Program(ProjectIDL as Project, provider)
}

// This is a helper function to get the program ID for the Project program depending on the cluster.
export function getProjectProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Project program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return PROJECT_PROGRAM_ID
  }
}
