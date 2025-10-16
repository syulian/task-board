import { useTranslations } from 'next-intl';

type TFunction = ReturnType<typeof useTranslations<never>>;
export default TFunction;
