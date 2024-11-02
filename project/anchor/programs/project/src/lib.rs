#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod project {
    use super::*;

  pub fn close(_ctx: Context<CloseProject>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.project.count = ctx.accounts.project.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.project.count = ctx.accounts.project.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeProject>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.project.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeProject<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Project::INIT_SPACE,
  payer = payer
  )]
  pub project: Account<'info, Project>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseProject<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub project: Account<'info, Project>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub project: Account<'info, Project>,
}

#[account]
#[derive(InitSpace)]
pub struct Project {
  count: u8,
}
