import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

const WIDGET_ID = "pi-agent-animations.cat";
const TRACK_WIDTH = 28;
const INTERVAL_MS = 220;

let timer: NodeJS.Timeout | undefined;
let position = 0;
let direction: 1 | -1 = 1;
let enabled = true;
let lastCtx: ExtensionContext | undefined;
let frame = 0;

const catRight = ["ᓚᘏᗢ", "ᓚᘏᗢ ᶻ", "ᓚᘏᗢ"];
const catLeft = ["ᗢᘏᓗ", "ᶻ ᗢᘏᓗ", "ᗢᘏᓗ"];

function renderCat(ctx: ExtensionContext) {
  const cat = direction === 1 ? catRight[frame % catRight.length] : catLeft[frame % catLeft.length];
  const spaces = " ".repeat(Math.max(0, position));
  const line = `${spaces}${cat}`;

  ctx.ui.setWidget(
    WIDGET_ID,
    (_tui, theme) => ({
      render: (width: number) => {
        const maxWidth = Math.max(0, Math.min(width, TRACK_WIDTH + 8));
        return [theme.fg("accent", line.slice(0, maxWidth))];
      },
      invalidate: () => {},
    }),
    { placement: "belowEditor" },
  );
}

function tick() {
  if (!enabled || !lastCtx) return;

  frame += 1;
  position += direction;

  if (position >= TRACK_WIDTH) {
    position = TRACK_WIDTH;
    direction = -1;
  } else if (position <= 0) {
    position = 0;
    direction = 1;
  }

  renderCat(lastCtx);
}

function start(ctx: ExtensionContext) {
  lastCtx = ctx;
  if (!enabled) return;
  renderCat(ctx);
  if (!timer) timer = setInterval(tick, INTERVAL_MS);
}

function stop(ctx?: ExtensionContext) {
  if (timer) {
    clearInterval(timer);
    timer = undefined;
  }
  (ctx ?? lastCtx)?.ui.setWidget(WIDGET_ID, undefined);
}

export default function (pi: ExtensionAPI) {
  pi.on("session_start", (_event, ctx) => {
    start(ctx);
  });

  pi.on("session_shutdown", (_event, ctx) => {
    stop(ctx);
    lastCtx = undefined;
  });

  pi.registerCommand("cat", {
    description: "Toggle the tiny walking cat animation",
    handler: async (args, ctx) => {
      const action = args.trim().toLowerCase();

      if (action === "off" || action === "stop") {
        enabled = false;
        stop(ctx);
        ctx.ui.notify("Cat animation off", "info");
        return;
      }

      if (action === "on" || action === "start") {
        enabled = true;
        start(ctx);
        ctx.ui.notify("Cat animation on", "success");
        return;
      }

      enabled = !enabled;
      if (enabled) {
        start(ctx);
        ctx.ui.notify("Cat animation on", "success");
      } else {
        stop(ctx);
        ctx.ui.notify("Cat animation off", "info");
      }
    },
  });
}
