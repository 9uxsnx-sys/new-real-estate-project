You are working inside a live repository with full context. Create a new component based on the HTML and CSS I provide.

Honor the current folder structure and coding conventions. If a `components` folder exists, split HTML/CSS across component files for modularity. Propose file paths up front and then produce patches/diffs for each file you add or change.

## Project alignment
- If Shadcn UI is present, follow its patterns (foldering, `@/components/ui/*`, `cn` util, variants).
- If an icon library is present, replace inline SVGs with icons from that library.
- If the project uses TypeScript, make the component fully type-safe. Match the repo's preference for `interface` vs `type`.
- If the app is Next.js and uses `next/image`, use it for images.
- Use loops for repeated structures.
- Copy the HTML verbatim (except for the explicit rules above). Do not alter semantics.
- Prefer small, focused subcomponents rather than one large component.

## HTML and CSS

This html and css is extracted from `https://aeline.framer.website/` via the selector `footer.framer-uOBZL.framer-swwLS.framer-s270B.framer-b3zUJ.framer-1png895.framer-v-1png895`. Don't call the component the name of the website, choose a name that is more generic.
The original background color for this html is `rgb(255, 255, 255)` (the color of the plane behind the html). When integrating the component into the project, make sure the background color of the location, where the new component is placed, matches the theme of the original background color. It doesn't need to be exactly the same, but the theme should match (light, dark, etc.).

**Skip any css if:**
- It is common and already included through Tailwind's Preflight styles (must be generic and not custom).
- It is already defined by the projects global css.

**Important:**
If the css contains a layer statement (e.g. `@layer base, component;`), you must not skip it and you must insert this statement at the top most position of the global css file, even above any Tailwind at-rules like `@import "tailwindcss"`, `@tailwind base;`, `@tailwind components;` or `@tailwind utilities;`. Furthermore, you must preserve any css layer blocks (e.g. `@layer base { ... }`) with their order, when including styles. Integrate the layer blocks somewhere in the global css file, most likely at the end of the file. Any deviation from this, and the styles might break.

```html
<footer class="[font-family:sans-serif] text-xs flex-col content-center justify-start items-center gap-y-2.5 gap-x-2.5 h-min flex relative overflow-x-hidden overflow-y-hidden p-3 bg-white w-full" id="component">
  <div class="flex-col flex-none content-center justify-end items-center gap-y-10 gap-x-10 w-full max-w-screen-2xl h-min flex relative p-10 bg-neutral-900 rounded-3xl">
    <div class="flex-none content-start justify-start items-start gap-y-20 gap-x-20 w-full h-min flex relative">
      <div class="flex-col grow shrink-0 basis-0 content-start justify-start self-stretch items-start gap-y-20 gap-x-20 w-px flex relative overflow-x-hidden overflow-y-hidden">
        <div class="flex-col flex-none content-start justify-start items-start gap-y-6 gap-x-6 w-full h-min flex relative">
          <div class="flex-none relative will-change-transform"><a class="cursor-pointer content-center justify-start items-center gap-y-3 gap-x-3 w-min h-min no-underline flex relative" tabindex="0">
              <div parentsize="0" _constraints="[object Object]" rotation="0" shadows="" class="flex-none w-10 h-8 relative [image-rendering:pixelated] shrink-0" aria-hidden="true">
                <div class="w-full h-full aspect-[inherit]"><svg class="align-baseline w-full h-full"><svg viewBox="0 0 40 30">
                      <path d="M 36.968 20.426 L 33.716 26.059 L 24.189 26.048 L 27.223 20.794 L 18.262 5.293 L 28.346 5.337 Z" fill="var(--token-6f1cfa67-1158-449a-89e5-107eb453b2fc, rgb(255, 255, 255)) /* {&quot;name&quot;:&quot;white&quot;} */">
                      </path>
                      <path d="M 9.807 5.266 L 16.312 5.266 L 21.066 13.522 L 14.999 13.521 L 6.055 29.033 L 1.051 20.277 Z" fill="var(--token-6f1cfa67-1158-449a-89e5-107eb453b2fc, rgb(255, 255, 255)) /* {&quot;name&quot;:&quot;white&quot;} */">
                      </path>
                    </svg></svg></div>
              </div>
              <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
                <p dir="auto" class="text-white tracking-[-1.6px] [font-family:Inter,Inter_Placeholder,sans-serif] text-2xl leading-7 p-0">Aeline</p>
              </div>
            </a></div>
          <div class="outline-0 flex-col justify-start flex flex-none w-full relative will-change-transform">
            <p class="text-white tracking-[-0.02em] text-left [text-wrap:balance] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">Easily adapt to changes and scale your operations with our flexible infrastructure, designed to support your business growth.</p>
          </div>
        </div>
      </div>
      <div class="grow shrink-0 basis-0 content-center justify-end items-center gap-y-20 gap-x-20 w-px h-min flex relative">
        <div class="flex-col flex-none content-start justify-center items-start gap-y-2 gap-x-2 w-min h-min flex relative will-change-transform">
          <div class="flex-none relative"><a class="cursor-pointer flex-col content-center justify-center items-center gap-y-2.5 gap-x-2.5 w-min h-min no-underline flex relative overflow-x-hidden overflow-y-hidden px-5 py-3" href="./" tabindex="0">
              <div class="flex-col flex-none content-center justify-start items-center gap-y-0 gap-x-0 w-min flex relative overflow-x-hidden overflow-y-hidden h-6">
                <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
                  <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">Home</p>
                </div>
                <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
                  <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">Home</p>
                </div>
              </div>
            </a></div>
          <div class="flex-none relative"><a class="cursor-pointer flex-col content-center justify-center items-center gap-y-2.5 gap-x-2.5 w-min h-min no-underline flex relative overflow-x-hidden overflow-y-hidden px-5 py-3" href="./about-us" tabindex="0">
              <div class="flex-col flex-none content-center justify-start items-center gap-y-0 gap-x-0 w-min flex relative overflow-x-hidden overflow-y-hidden h-6">
                <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
                  <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">About us</p>
                </div>
                <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
                  <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">About us</p>
                </div>
              </div>
            </a></div>
          <div class="flex-none relative"><a class="cursor-pointer flex-col content-center justify-center items-center gap-y-2.5 gap-x-2.5 w-min h-min no-underline flex relative overflow-x-hidden overflow-y-hidden px-5 py-3" href="./our-services" tabindex="0">
              <div class="flex-col flex-none content-center justify-start items-center gap-y-0 gap-x-0 w-min flex relative overflow-x-hidden overflow-y-hidden h-6">
                <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative origin-[50%_50%_0px]">
                  <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">Services</p>
                </div>
                <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative origin-[50%_50%_0px]">
                  <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">Services</p>
                </div>
              </div>
            </a></div>
        </div>
        <div class="flex-col flex-none content-start justify-center items-start gap-y-2 gap-x-2 w-min h-min flex relative will-change-transform">
          <div class="flex-none relative"><a class="cursor-pointer flex-col content-center justify-center items-center gap-y-2.5 gap-x-2.5 w-min h-min no-underline flex relative overflow-x-hidden overflow-y-hidden px-5 py-3" href="./pricing" tabindex="0">
              <div class="flex-col flex-none content-center justify-start items-center gap-y-0 gap-x-0 w-min flex relative overflow-x-hidden overflow-y-hidden h-6">
                <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
                  <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">Pricing</p>
                </div>
                <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
                  <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">Pricing</p>
                </div>
              </div>
            </a></div>
          <div class="flex-none relative"><a class="cursor-pointer flex-col content-center justify-center items-center gap-y-2.5 gap-x-2.5 w-min h-min no-underline flex relative overflow-x-hidden overflow-y-hidden px-5 py-3" href="./blog" tabindex="0">
              <div class="flex-col flex-none content-center justify-start items-center gap-y-0 gap-x-0 w-min flex relative overflow-x-hidden overflow-y-hidden h-6">
                <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative origin-[50%_50%_0px]">
                  <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">Blog</p>
                </div>
                <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative origin-[50%_50%_0px]">
                  <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">Blog</p>
                </div>
              </div>
            </a></div>
          <div class="flex-none relative"><a class="cursor-pointer flex-col content-center justify-center items-center gap-y-2.5 gap-x-2.5 w-min h-min no-underline flex relative overflow-x-hidden overflow-y-hidden px-5 py-3" href="./contact" tabindex="0">
              <div class="flex-col flex-none content-center justify-start items-center gap-y-0 gap-x-0 w-min flex relative overflow-x-hidden overflow-y-hidden h-6">
                <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative origin-[50%_50%_0px]">
                  <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">Contact</p>
                </div>
                <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative origin-[50%_50%_0px]">
                  <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base leading-6 p-0" dir="auto">Contact</p>
                </div>
              </div>
            </a></div>
        </div>
      </div>
    </div>
    <div class="flex-col flex-none content-start justify-start items-start gap-y-6 gap-x-6 w-full h-min flex relative">
      <form class="flex-none content-start justify-start items-start gap-y-5 gap-x-5 w-full max-w-sm h-min flex relative overflow-x-hidden overflow-y-hidden will-change-transform"><label class="flex-col grow shrink-0 basis-0 content-start justify-start items-start gap-y-2.5 gap-x-2.5 w-px h-min flex relative">
          <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
            <p class="text-white tracking-[-0.8px] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-xl leading-7 p-0" dir="auto">Subscribe our newsletter</p>
          </div>
          <div class="bg-zinc-800 transition-all ease-in-out overflow-x-hidden overflow-y-hidden rounded-[32px] items-center flex pl-6 pr-1 py-1 after:content-[&quot;&quot;] after:pointer-events-none after:w-full after:h-full after:transition-all after:ease-in-out after:absolute after:rounded-[32px] after:left-0 after:top-0 flex-none w-full h-14 relative focus-within:after:border focus-within:after:border-solid focus-within:after:border-lime-300"><input type="email" required="" name="Email" placeholder="Enter your email" class="[font-family:Plus_Jakarta_Sans] text-base font-normal text-white text-ellipsis whitespace-nowrap tracking-[0] h-full leading-6 overflow-x-hidden overflow-y-hidden border-[none] focus-visible:outline-0 flex-1 w-auto placeholder:text-neutral-500" value=""></div>
        </label>
        <div class="will-change-transform z-[1] flex-none absolute right-1 bottom-1"><button type="submit" class="[appearance:auto] [font-family:sans-serif] text-xs border-0 cursor-pointer will-change-transform content-center justify-center items-center gap-y-1 gap-x-1 w-min h-min flex relative overflow-x-hidden overflow-y-hidden pl-4 pr-1 py-1 bg-lime-300 rounded-[48px]">
            <div class="flex-col flex-none content-start justify-start items-start gap-y-0 gap-x-0 w-min h-5 flex relative overflow-x-hidden overflow-y-hidden px-1">
              <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
                <p class="text-neutral-900 tracking-[1.6px] uppercase [font-family:Geist_Mono,monospace] text-sm font-medium leading-5 p-0" dir="auto">Submit</p>
              </div>
              <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
                <p class="text-neutral-900 tracking-[1.6px] uppercase [font-family:Geist_Mono,monospace] text-sm font-medium leading-5 p-0" dir="auto">Submit</p>
              </div>
            </div>
            <div class="aspect-[1] will-change-transform flex-col flex-none content-center justify-center items-center gap-y-1 gap-x-1 w-10 flex relative overflow-x-hidden overflow-y-hidden px-3 py-2 bg-neutral-900 rounded-[40px]">
              <div class="aspect-[1] bg-white [mask:url(&quot;data:image/svg+xml,&lt;svg%20display=\&quot;block\&quot;%20role=\&quot;presentation\&quot;%20viewBox=\&quot;0%200%2020%2020\&quot;%20xmlns=\&quot;http://www.w3.org/2000/svg\&quot;&gt;&lt;path%20d=\&quot;M%208.336%202.84%20L%201.176%2010%20L%200%208.824%20L%207.16%201.664%20L%200.849%201.664%20L%200.849%200%20L%2010%200%20L%2010%209.151%20L%208.336%209.151%20Z\&quot;%20fill=\&quot;var(--1ryvdy4,var(--token-6f1cfa67-1158-449a-89e5-107eb453b2fc,rgb(255,255,255)))\&quot;%20height=\&quot;10px\&quot;%20id=\&quot;jXOChLcZb\&quot;%20transform=\&quot;translate(4.634%205.344)\&quot;%20width=\&quot;10px\&quot;/&gt;&lt;/svg&gt;&quot;) 50% no-repeat alpha,none] flex-none w-5 relative"></div>
              <div class="bg-white [mask:url(&quot;data:image/svg+xml,&lt;svg%20display=\&quot;block\&quot;%20role=\&quot;presentation\&quot;%20viewBox=\&quot;0%200%2020%2020\&quot;%20xmlns=\&quot;http://www.w3.org/2000/svg\&quot;&gt;&lt;path%20d=\&quot;M%208.336%202.84%20L%201.176%2010%20L%200%208.824%20L%207.16%201.664%20L%200.849%201.664%20L%200.849%200%20L%2010%200%20L%2010%209.151%20L%208.336%209.151%20Z\&quot;%20fill=\&quot;var(--1ryvdy4,var(--token-6f1cfa67-1158-449a-89e5-107eb453b2fc,rgb(255,255,255)))\&quot;%20height=\&quot;10px\&quot;%20id=\&quot;jXOChLcZb\&quot;%20transform=\&quot;translate(4.634%205.344)\&quot;%20width=\&quot;10px\&quot;/&gt;&lt;/svg&gt;&quot;) 50% no-repeat alpha,none] aspect-[1] z-[1] flex-none w-5 absolute right-8 top-8"></div>
            </div>
          </button></div><input type="text" name="website" tabindex="-1" autocomplete="one-time-code" aria-hidden="true" value="" class="py-px [font-family:sans-serif] text-xs absolute scale-0"><input type="text" name="company" tabindex="-1" autocomplete="one-time-code" aria-hidden="true" value="" class="py-px [font-family:sans-serif] text-xs absolute scale-0"><input type="text" name="message" tabindex="-1" autocomplete="one-time-code" aria-hidden="true" value="" class="py-px [font-family:sans-serif] text-xs absolute scale-0"><input type="text" name="subject" tabindex="-1" autocomplete="one-time-code" aria-hidden="true" value="" class="py-px [font-family:sans-serif] text-xs absolute scale-0"><input type="text" name="title" tabindex="-1" autocomplete="one-time-code" aria-hidden="true" value="" class="py-px [font-family:sans-serif] text-xs absolute scale-0"><input type="text" name="description" tabindex="-1" autocomplete="one-time-code" aria-hidden="true" value="" class="py-px [font-family:sans-serif] text-xs absolute scale-0"><input type="text" name="feedback" tabindex="-1" autocomplete="one-time-code" aria-hidden="true" value="" class="py-px [font-family:sans-serif] text-xs absolute scale-0"><input type="text" name="notes" tabindex="-1" autocomplete="one-time-code" aria-hidden="true" value="" class="py-px [font-family:sans-serif] text-xs absolute scale-0"><input type="text" name="details" tabindex="-1" autocomplete="one-time-code" aria-hidden="true" value="" class="py-px [font-family:sans-serif] text-xs absolute scale-0"><input type="text" name="remarks" tabindex="-1" autocomplete="one-time-code" aria-hidden="true" value="" class="py-px [font-family:sans-serif] text-xs absolute scale-0"><input type="text" name="comments" tabindex="-1" autocomplete="one-time-code" aria-hidden="true" value="" class="py-px [font-family:sans-serif] text-xs absolute scale-0">
      </form>
    </div>
    <div class="flex-none content-center justify-between items-center w-full h-min flex relative py-3">
      <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative will-change-transform">
        <p class="text-neutral-500 tracking-[-0.02em] text-center [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-sm leading-5 p-0" dir="auto">© 2025 Ailine Inc. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>
```

```css
@layer base, component;
@font-face {
  font-family: Plus Jakarta Sans;
  src: url('https://proxy.extractcss.dev/https://framerusercontent.com/third-party-assets/fontshare/wf/ZLH2B3SFZRQ3US4ZUYG2367OYUMTVTGK/RSOPFK2EORTGBCOBZRY42GDLXFFB4IQW/JZ35FM4UJSKC7X2PM65RH75Q5KLE552S.woff2');
  font-display: swap;
  font-style: normal;
  font-weight: 600;
}
@font-face {
  font-family: Plus Jakarta Sans;
  src: url('https://proxy.extractcss.dev/https://framerusercontent.com/third-party-assets/fontshare/wf/DG3FNZZAXTT6HZWYCQT3SK2X2XDKA6XH/KWXXWQ4T72VNT2BQDELHDOCDISYUBIWM/XMNYCZFXUH3EYMLHCQEDXUTZTCNGZHL5.woff2');
  font-display: swap;
  font-style: italic;
  font-weight: 600;
}
@font-face {
  font-family: Plus Jakarta Sans Placeholder;
  src: local(Arial);
  ascent-override: 98.16%;
  descent-override: 20.99%;
  line-gap-override: 0%;
  size-adjust: 105.75%;
}
@font-face {
  font-family: Plus Jakarta Sans Placeholder;
  src: local(Arial);
  ascent-override: 122.93%;
  descent-override: 34.04%;
  line-gap-override: 11.35%;
  size-adjust: 105.75%;
}
@layer component {
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: inherit;
  }
}

```

## Repo-specific steps
1) Detect Tailwind version and config; integrate only nonstandard Tailwind classes (arbitrary JIT, custom tokens).
2) If CSS includes `@layer`, insert the layer statement at the top of global CSS (above Tailwind at-rules) and preserve block order.
3) Emit a minimal test or story (if the repo uses Storybook/Playwright) for the new component.
4) Output a final diff for all touched files.

## Assets

Look closely at the html and css and figure out which assets are used. Make sure to download them via shell and include it in a project aligned way. For fonts, check if the project already uses them. If not, check if we can include them via `next/font/...`, otherwise download them via shell and include them in a project aligned way via font-face, unless stated differently by the user or Next.js isn't used.

You need to ask the user before doing any shell interactions for downloading the assets, so do this as last step! Before you have the permission, use the regular urls provided by the html, no placeholder, just the original urls provided by the html verbatim! This means you also need to allow the urls external host via e.g. next config.