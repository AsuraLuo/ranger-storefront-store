import Link from "next/link";

import { domainConf } from "@/config/domain.conf";

const { i18n } = domainConf;
const { locales } = i18n;

const Page = () => {
  return (
    <div>
      <h1>Choose Country</h1>
      <div
        style={{
          display: "grid",
          marginTop: 60,
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 50,
        }}
      >
        {locales.map((locale: string) => {
          return (
            <div
              key={locale}
              style={{
                padding: 50,
                textAlign: "center",
                textTransform: "uppercase",
                border: "1px solid #d9d9d9",
              }}
            >
              <Link href={locale}>{locale}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
