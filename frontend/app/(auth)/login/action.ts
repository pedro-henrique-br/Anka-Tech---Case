'use server'

import { cookies } from 'next/headers'

export async function loginAction(token: string) {
  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  })
}
