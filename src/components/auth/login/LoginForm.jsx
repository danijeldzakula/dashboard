import { Wrapper } from '@/components/content';

export default function LoginForm() {
  const onSubmit = (event) => {
    event.preventDefault();
  };
  return <form onSubmit={onSubmit} className="form"></form>;
}
