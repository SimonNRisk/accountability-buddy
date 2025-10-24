import { Mjml, MjmlHead, MjmlTitle, MjmlPreview, MjmlBody, MjmlSection, MjmlColumn, MjmlText } from "@faire/mjml-react";

type Props = { dateLabel: string; done: string[]; notDone: string[] };

export default function DailySummaryEmail({ dateLabel, done, notDone }: Props) {
  return (
    <Mjml>
      <MjmlHead>
        <MjmlTitle>Daily Accountability — {dateLabel}</MjmlTitle>
        <MjmlPreview>What you did & didn’t do yesterday</MjmlPreview>
      </MjmlHead>
      <MjmlBody width={560}>
        <MjmlSection>
          <MjmlColumn>
            <MjmlText fontSize="18px" fontWeight={"700"}>
              Daily Accountability — {dateLabel}
            </MjmlText>
            <MjmlText lineHeight="1.6">
              ✅ <b>Completed</b> ({done.length}): {done.length ? done.join(", ") : "None"}
            </MjmlText>
            <MjmlText lineHeight="1.6">
              ⭕ <b>Not Completed</b> ({notDone.length}): {notDone.length ? notDone.join(", ") : "None"}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
}
