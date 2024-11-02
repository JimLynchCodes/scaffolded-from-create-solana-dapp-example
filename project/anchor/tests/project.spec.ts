import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Project} from '../target/types/project'

describe('project', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Project as Program<Project>

  const projectKeypair = Keypair.generate()

  it('Initialize Project', async () => {
    await program.methods
      .initialize()
      .accounts({
        project: projectKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([projectKeypair])
      .rpc()

    const currentCount = await program.account.project.fetch(projectKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Project', async () => {
    await program.methods.increment().accounts({ project: projectKeypair.publicKey }).rpc()

    const currentCount = await program.account.project.fetch(projectKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Project Again', async () => {
    await program.methods.increment().accounts({ project: projectKeypair.publicKey }).rpc()

    const currentCount = await program.account.project.fetch(projectKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Project', async () => {
    await program.methods.decrement().accounts({ project: projectKeypair.publicKey }).rpc()

    const currentCount = await program.account.project.fetch(projectKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set project value', async () => {
    await program.methods.set(42).accounts({ project: projectKeypair.publicKey }).rpc()

    const currentCount = await program.account.project.fetch(projectKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the project account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        project: projectKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.project.fetchNullable(projectKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
