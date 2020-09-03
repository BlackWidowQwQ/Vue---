import clone from "@/lib/clone.ts";
import dayjs from "dayjs";
function addAmount(type: string, time: string, records: RecordItem[]) {
  let daily = 0;
  let monthly = 0;
  const now = dayjs();
  const recordList = records;
  const newList = clone(recordList).filter((r) => r.type === type);
  for (let i = 0; i < newList.length; i++) {
    if (now.isSame(dayjs(newList[i].createdAt), "day")) {
      daily += Number(newList[i].amount);
    }
    if (now.isSame(dayjs(newList[i].createdAt), "month")) {
      monthly += Number(newList[i].amount);
    }
  }
  if (time === "day") {
    return daily;
  }
  if (time === "month") {
    return monthly;
  } else {
    return;
  }
}

export default addAmount;
