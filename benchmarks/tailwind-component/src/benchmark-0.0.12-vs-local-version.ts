import { render } from "@react-email/render";
import { writeFileSync } from "node:fs";
import { Bench } from "tinybench";
import EmailWithTailwind from "./emails/with-tailwind.js";
import { Tailwind as LocalTailwind } from "@react-email/tailwind";
import { Tailwind as VersionTwelveTailwind } from "tailwind-0.0.12";

const main = async () => {
  const bench = new Bench({
    iterations: 100,
  });

  bench
    .add("local", async () => {
      await render(EmailWithTailwind({ Tailwind: LocalTailwind }));
    })
    .add("0.0.12", async () => {
      await render(EmailWithTailwind({ Tailwind: VersionTwelveTailwind }));
    });

  await bench.run();

  return bench;
};

main()
  .then((bench) => {
    writeFileSync(
      "bench-results-100-iterations.json",
      JSON.stringify(bench.results),
      "utf-8",
    );
    console.table(bench.table());
  })
  .catch(console.error);
