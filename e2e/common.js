export const SCREEN_TIMES = 3;

export async function pushSelf(scenario, times) {
  for (let i = 0; i < times; i++) {
    await element(by.id(`push-self-${scenario}`)).tap();
  }
}
