import {Bite} from "@reflexio/core-v1"
import { StagingScript } from "./Script";

export function biteStaging<Tg, St, K extends keyof Tg, RTg>(biteName: K) {
    return Bite<
    Tg,
    St,
    K,
    RTg
  >(null, {
    watchScope: [biteName as any],
    instance: 'stable',
    script: StagingScript,
    initOn: 'init' as any,
  });
}
