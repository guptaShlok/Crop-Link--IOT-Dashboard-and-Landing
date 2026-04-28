import { SignupForm } from '@/components/auth/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Crop Link',
  description: 'Create a new Crop Link account',
};

export default function SignupPage() {
  return <SignupForm />;
}
