import { Button } from '@/components/ui/button.tsx';
import { Form, FormField } from '@/components/ui/form.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productFormSchema } from '@/lib/zod/schemas.ts';
import useProductHandler from '@/hooks/useProductHandler.ts';
import FormFileInner from '@/components/products/form/FormFileInner.tsx';
import ProductImgList from '@/components/products/form/ProductImgList.tsx';
import FormComboxInner from '@/components/products/form/FormComboxInner.tsx';
import FormRadioGroup from '@/components/products/form/FormRadioGroup.tsx';
import PageTitle from '@/components/PageTitle.tsx';
import { Metatags } from '@/metadatas/metadatas.tsx';
import Container from '@/components/Container.tsx';
import { Submission } from '@/components/compound/submission';

export default function SellerProductAddPage() {
  const { submitHandler, addImgHandler, previewImages, deleteImageHandler, isLoading } =
    useProductHandler();
  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: '',
      desc: '',
      condition: '',
      price: '',
      category: '',
      imgList: [],
    },
  });

  return (
    <>
      <Metatags title={`Seconds: 중고거래 - 상품 추가`} desc={'상품 추가 페이지 입니다.'} />
      <Container className={'pb-4'}>
        <PageTitle title={'상품 등록'} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <div className={'flex pb-4 relative gap-4'}>
              <FormFileInner
                form={form}
                name={'imgList'}
                label={'사진등록'}
                addImgHandler={addImgHandler}
              />
              <ProductImgList
                previewImages={previewImages}
                deleteImageHandler={deleteImageHandler}
              />
            </div>
            <FormField
              name={'title'}
              render={({ field }) => (
                <Submission.Root>
                  <Submission.Label label={'제목'} />
                  <Submission.Content>
                    <Submission.Input placeholder={'제목을 입력해 주세요.'} field={field} />
                  </Submission.Content>
                </Submission.Root>
              )}
            />
            <FormField
              name={'price'}
              render={({ field }) => (
                <Submission.Root>
                  <Submission.Label label={'가격'} />
                  <Submission.Content>
                    <Submission.InputIcon />
                    <Submission.Input
                      placeholder={'가격을 입력해 주세요.'}
                      type={'number'}
                      hasPadding={true}
                      field={field}
                    />
                  </Submission.Content>
                </Submission.Root>
              )}
            />
            <FormField
              name={'desc'}
              render={({ field }) => (
                <Submission.Root>
                  <Submission.Label label={'상세 내용'} />
                  <Submission.Content>
                    <Submission.Textarea
                      placeholder={'게시글 내용을 작성해 주세요.'}
                      field={field}
                    />
                  </Submission.Content>
                </Submission.Root>
              )}
            />
            <FormComboxInner form={form} name={'category'} label={'카테고리'} />
            <FormRadioGroup form={form} name={'condition'} label={'상태'} />
            <Button className={'w-full mt-10 py-6'} type={'submit'} disabled={isLoading}>
              등록 하기
            </Button>
          </form>
        </Form>
      </Container>
    </>
  );
}
