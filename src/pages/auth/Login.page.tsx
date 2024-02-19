import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInner from '@/components/auth/FormInner.tsx';
import { Button } from '@/components/ui/button.tsx';
import SocialLogins from '@/components/auth/SocialLogins.tsx';
import { Link } from 'react-router-dom';
import AuthHeading from '@/components/auth/AuthHeading.tsx';
import { loginFormSchema } from '@/lib/zod/schemas.ts';
import { useAuth } from '@/apis/useAuth.ts';
import { Metatags } from '@/metadatas/metadatas.tsx';

export default function LoginPage() {
  const { authServerCall, handleGoogleLogin, handleGithubLogin } = useAuth();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submitHandler = async (values: z.infer<typeof loginFormSchema>) => {
    await authServerCall({ type: 'login', data: values });
  };
  return (
    <>
      <Metatags title={`Seconds: 중고거래 - 로그인`} desc={'로그인 페이지 입니다.'} />
      <div className={'pb-6'}>
        <AuthHeading text={'로그인'} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <FormInner
              form={form}
              name={'email'}
              label={'이메일'}
              placeholder={'example@email.com'}
            />
            <FormInner
              form={form}
              name={'password'}
              type={'password'}
              label={'비밀번호'}
              placeholder={'최소 8글자 이상 대문자, 소문자, 특수문자 1개 포함 입니다.'}
            />
            <Button data-cy={'login-button'} className={'w-full mt-10 py-6'} type={'submit'}>
              로그인 하기
            </Button>
          </form>
          <p className={'text-center mt-8 text-sm text-zinc-600'}>
            계정이 없으신가요?
            <span className={'text-blue-500'}>
              <Link to={'/register/select'}> 회원가입 하기</Link>
            </span>
          </p>
          <SocialLogins
            handleGoogleLogin={handleGoogleLogin}
            handleGithubLogin={handleGithubLogin}
          />
        </Form>
      </div>
    </>
  );
}
