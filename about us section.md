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

This html and css is extracted from `https://aeline.framer.website/` via the selector `section.framer-cjar8j`. Don't call the component the name of the website, choose a name that is more generic.
The original background color for this html is `rgb(255, 255, 255)` (the color of the plane behind the html). When integrating the component into the project, make sure the background color of the location, where the new component is placed, matches the theme of the original background color. It doesn't need to be exactly the same, but the theme should match (light, dark, etc.).

**Skip any css if:**
- It is common and already included through Tailwind's Preflight styles (must be generic and not custom).
- It is already defined by the projects global css.

**Important:**
If the css contains a layer statement (e.g. `@layer base, component;`), you must not skip it and you must insert this statement at the top most position of the global css file, even above any Tailwind at-rules like `@import "tailwindcss"`, `@tailwind base;`, `@tailwind components;` or `@tailwind utilities;`. Furthermore, you must preserve any css layer blocks (e.g. `@layer base { ... }`) with their order, when including styles. Integrate the layer blocks somewhere in the global css file, most likely at the end of the file. Any deviation from this, and the styles might break.

```html
<section class="[font-family:sans-serif] text-xs max-md:px-4 max-md:py-12 bg-white flex-col flex-none content-center justify-start items-center gap-y-2.5 gap-x-2.5 w-full h-min flex relative overflow-x-hidden overflow-y-hidden px-14 py-20" id="component">
  <div class="flex-col flex-none content-center justify-start items-center gap-y-20 gap-x-20 w-full max-w-screen-2xl h-min flex relative">
    <div class="flex-col flex-none content-center justify-start items-center gap-y-5 gap-x-5 w-full max-w-screen-md h-min flex relative">
      <div class="contents">
        <div class="flex-none relative will-change-transform">
          <div class="content-center justify-start items-center gap-y-3 gap-x-3 w-min h-min flex relative">
            <div class="flex-none w-1 h-1 relative bg-neutral-900"></div>
            <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
              <p class="text-neutral-900 tracking-[1.6px] uppercase [font-family:Geist_Mono,monospace] text-sm font-medium leading-5 p-0" dir="auto">About Us</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-col flex-none content-center justify-center items-center gap-y-0 gap-x-0 w-full h-min flex relative">
        <div class="outline-0 flex-col justify-start flex whitespace-pre-wrap [word-break:break-word] [word-wrap:break-word] flex-none w-full relative">
          <h2 class="text-neutral-900 tracking-[-0.06em] text-center [text-wrap:balance] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-5xl font-medium leading-[117%] p-0 max-md:text-4xl" dir="auto"><span class="will-change-transform inline-block">A</span> <span class="will-change-transform inline-block">global</span> <span class="will-change-transform inline-block">consulting</span> <span class="will-change-transform inline-block">partner</span> <span class="will-change-transform inline-block"></span></h2>
        </div>
        <div class="max-md:flex-col max-md:flex-wrap max-md:content-center max-md:items-center max-md:gap-y-0 flex-none content-end justify-center items-end gap-y-2 gap-x-2 w-full h-min flex relative">
          <div class="outline-0 flex-col justify-start flex max-md:whitespace-pre-wrap max-md:[word-break:break-word] max-md:[word-wrap:break-word] max-md:w-full whitespace-pre flex-none relative">
            <h2 class="text-neutral-900 tracking-[-0.06em] text-center [text-wrap:balance] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-5xl font-medium leading-[117%] p-0 max-md:text-4xl" dir="auto"><span class="will-change-transform inline-block">dedicated</span> <span class="will-change-transform inline-block">to</span> <span class="will-change-transform inline-block">building</span></h2>
          </div>
          <div class="flex-none content-end justify-center items-end gap-y-2 gap-x-2 w-min h-min flex relative overflow-x-hidden overflow-y-hidden">
            <div class="contents">
              <div class="max-md:w-8 max-md:h-8 flex-none w-12 h-12 relative will-change-transform">
                <div class="will-change-transform content-center justify-center items-center gap-y-20 gap-x-20 flex relative overflow-x-hidden overflow-y-hidden aspect-[1] bg-sky-400 w-full h-full rounded-[100px]">
                  <div class="bg-white [mask:url(&quot;data:image/svg+xml,&lt;svg%20display=\&quot;block\&quot;%20role=\&quot;presentation\&quot;%20viewBox=\&quot;0%200%2024%2024\&quot;%20xmlns=\&quot;http://www.w3.org/2000/svg\&quot;&gt;&lt;path%20d=\&quot;M%2018.541%2010.442%20L%2010.16%2010.442%20L%2010.16%202.061%20C%2010.16%201.958%2010.076%201.873%209.973%201.873%20L%209.363%201.873%20C%208.134%201.872%206.916%202.114%205.779%202.584%20C%204.643%203.055%203.611%203.745%202.742%204.616%20C%201.887%205.468%201.205%206.479%200.736%207.592%20C%200.248%208.748%200%209.973%200%2011.239%20C%200%2012.505%200.248%2013.728%200.736%2014.884%20C%201.207%2015.997%201.882%2017%202.742%2017.86%20C%203.602%2018.72%204.603%2019.395%205.719%2019.866%20C%206.872%2020.356%208.113%2020.607%209.366%2020.605%20C%2010.595%2020.606%2011.813%2020.364%2012.95%2019.894%20C%2014.086%2019.423%2015.118%2018.733%2015.987%2017.863%20C%2016.847%2017.002%2017.522%2016.002%2017.993%2014.886%20C%2018.482%2013.733%2018.733%2012.492%2018.731%2011.239%20L%2018.731%2010.63%20C%2018.729%2010.527%2018.645%2010.442%2018.541%2010.442%20Z%20M%2020.602%209.141%20L%2020.541%208.48%20C%2020.341%206.324%2019.385%204.29%2017.843%202.755%20C%2016.302%201.215%2014.272%200.263%2012.103%200.062%20L%2011.44%200.001%20C%2011.33%20-0.009%2011.236%200.076%2011.236%200.186%20L%2011.236%209.179%20C%2011.236%209.282%2011.32%209.366%2011.423%209.366%20L%2020.414%209.343%20C%2020.524%209.341%2020.611%209.249%2020.602%209.141%20Z\&quot;%20fill=\&quot;var(--1ryvdy4,var(--token-6f1cfa67-1158-449a-89e5-107eb453b2fc,rgb(255,255,255)))\&quot;%20height=\&quot;20.604715888465787px\&quot;%20id=\&quot;Szs8A6uiP\&quot;%20transform=\&quot;translate(2%202)\&quot;%20width=\&quot;20.6022841142291px\&quot;/&gt;&lt;/svg&gt;&quot;) 50% no-repeat alpha,none] aspect-[1] flex-none relative w-5"></div>
                </div>
              </div>
            </div>
            <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
              <h2 class="text-neutral-900 tracking-[-0.06em] text-center [text-wrap:balance] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-5xl font-medium leading-[117%] p-0 max-md:text-4xl" dir="auto"><span class="will-change-transform inline-block">smarter</span></h2>
            </div>
          </div>
        </div>
        <div class="max-md:flex-wrap max-md:gap-y-0 flex-none content-end justify-center items-end gap-y-2 gap-x-2 w-full h-min flex relative">
          <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
            <h2 class="tracking-[-0.06em] text-center [text-wrap:balance] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-5xl font-medium leading-[117%] p-0 text-neutral-900/50 max-md:text-4xl" dir="auto"><span class="will-change-transform inline-block">and</span></h2>
          </div>
          <div class="contents">
            <div class="max-md:w-8 max-md:h-8 flex-none w-12 h-12 relative will-change-transform">
              <div class="will-change-transform content-center justify-center items-center gap-y-20 gap-x-20 flex relative overflow-x-hidden overflow-y-hidden aspect-[1] bg-lime-300 w-full h-full rounded-[100px]">
                <div class="bg-neutral-900 [mask:url(&quot;data:image/svg+xml,&lt;svg%20display=\&quot;block\&quot;%20role=\&quot;presentation\&quot;%20viewBox=\&quot;0%200%2024%2024\&quot;%20xmlns=\&quot;http://www.w3.org/2000/svg\&quot;&gt;&lt;path%20d=\&quot;M%207%200%20C%205.144%200%203.363%200.737%202.05%202.05%20C%200.737%203.363%200%205.143%200%207%20C%200%209.38%201.19%2011.47%203%2012.74%20L%203%2015%20C%203%2015.265%203.105%2015.52%203.293%2015.707%20C%203.48%2015.895%203.735%2016%204%2016%20L%2010%2016%20C%2010.265%2016%2010.52%2015.895%2010.707%2015.707%20C%2010.895%2015.52%2011%2015.265%2011%2015%20L%2011%2012.74%20C%2012.81%2011.47%2014%209.38%2014%207%20C%2014%205.143%2013.263%203.363%2011.95%202.05%20C%2010.637%200.737%208.856%200%207%200%20Z%20M%204%2019%20C%204%2019.265%204.105%2019.52%204.293%2019.707%20C%204.48%2019.895%204.735%2020%205%2020%20L%209%2020%20C%209.265%2020%209.52%2019.895%209.707%2019.707%20C%209.895%2019.52%2010%2019.265%2010%2019%20L%2010%2018%20L%204%2018%20Z\&quot;%20fill=\&quot;var(--1ryvdy4,var(--token-6f1cfa67-1158-449a-89e5-107eb453b2fc,rgb(255,255,255)))\&quot;%20height=\&quot;20px\&quot;%20id=\&quot;zKKsxFnUR\&quot;%20transform=\&quot;translate(4.6%202)\&quot;%20width=\&quot;14px\&quot;/&gt;&lt;/svg&gt;&quot;) 50% no-repeat alpha,none] aspect-[1] flex-none relative w-5"></div>
              </div>
            </div>
          </div>
          <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
            <h2 class="tracking-[-0.06em] text-center [text-wrap:balance] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-5xl font-medium leading-[117%] p-0 text-neutral-900/50 max-md:text-4xl" dir="auto"><span class="will-change-transform inline-block">more</span> <span class="will-change-transform inline-block"></span> <span class="will-change-transform inline-block">adaptive</span></h2>
          </div>
        </div>
      </div>
    </div>
    <div class="max-md:flex-col flex-none content-center justify-start items-center gap-y-6 gap-x-6 w-full h-min flex relative">
      <div class="contents">
        <div class="max-md:[align-self:unset] max-md:flex-none max-md:w-full max-md:h-80 flex-col grow shrink-0 basis-0 content-start justify-between self-stretch items-start w-px flex relative p-5 rounded-3xl will-change-transform">
          <div class="[corner-shape:inherit] absolute rounded-[inherit] inset-0"><img decoding="auto" width="2464" sizes="min(100vw - 32px, 1440px)" srcset="https://proxy.extractcss.dev/https://framerusercontent.com/images/JGdNRl6jQUnlEAMYGOue2qDYts.png?scale-down-to=512&amp;width=2464&amp;height=1856 512w, https://proxy.extractcss.dev/https://framerusercontent.com/images/JGdNRl6jQUnlEAMYGOue2qDYts.png?scale-down-to=1024&amp;width=2464&amp;height=1856 1024w, https://proxy.extractcss.dev/https://framerusercontent.com/images/JGdNRl6jQUnlEAMYGOue2qDYts.png?scale-down-to=2048&amp;width=2464&amp;height=1856 2048w, https://proxy.extractcss.dev/https://framerusercontent.com/images/JGdNRl6jQUnlEAMYGOue2qDYts.png?width=2464&amp;height=1856 2464w" src="https://proxy.extractcss.dev/https://framerusercontent.com/images/JGdNRl6jQUnlEAMYGOue2qDYts.png?width=2464&amp;height=1856" alt="" class="align-baseline [corner-shape:inherit] object-[center_center] object-cover w-full h-full rounded-[inherit]">
          </div>
          <div class="flex-none content-center justify-between items-center w-full h-min flex relative">
            <div parentsize="0" _constraints="[object Object]" rotation="0" shadows="" class="flex-none w-24 h-6 relative [image-rendering:pixelated] text-black shrink-0" aria-hidden="true">
              <div class="w-full h-full aspect-[inherit]"><svg viewBox="0 0 102 24" preserveAspectRatio="none" width="100%" class="align-baseline w-full h-full"><svg width="102" height="24" viewBox="0 0 102 24" fill="none">
                    <g clip-path="url(#svg-2037166872_1735_clip0_14237_2035)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00888 1.5V24H0V1.5H6.00888Z" fill="white">
                      </path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.01367 1.5H21.7826C25.9309 1.5 29.2937 4.85786 29.2937 9C29.2937 13.1422 25.9309 16.5 21.7826 16.5H15.0226V24H9.01367V1.5ZM15.0226 10.5H21.7826C22.6123 10.5 23.2848 9.82842 23.2848 9C23.2848 8.17158 22.6123 7.5 21.7826 7.5H15.0226V10.5Z" fill="white"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M51.8272 1.5V13.125C51.8272 15.8174 54.013 18 56.7094 18C59.4058 18 61.5918 15.8174 61.5918 13.125V1.5H67.6008V13.125C67.6008 19.1311 62.7246 24 56.7094 24C50.6944 24 45.8184 19.1311 45.8184 13.125V1.5H51.8272Z" fill="white"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M31.546 12C31.546 6.201 36.2539 1.5 42.0615 1.5H43.5637V7.5H42.0615C39.5725 7.5 37.5549 9.51474 37.5549 12V12.75C37.5549 18.9632 32.5106 24 26.2882 24H25.5371V18H26.2882C29.192 18 31.546 15.6495 31.546 12.75V12Z" fill="white"></path>
                      <path d="M101.399 2.25C101.399 3.49264 100.391 4.5 99.1456 4.5C97.9012 4.5 96.8926 3.49264 96.8926 2.25C96.8926 1.00736 97.9012 0 99.1456 0C100.391 0 101.399 1.00736 101.399 2.25Z" fill="white"></path>
                      <path d="M74.0526 23.9986L76.92 12.0094L79.0518 19.2221C80.3226 23.524 86.4252 23.524 87.6966 19.2221L89.8278 12.0094L92.6952 23.9986H98.8728L94.3644 5.14626C93.2922 0.663027 86.9652 0.497032 85.6584 4.91791L83.3742 12.6485L81.0894 4.91792C79.7832 0.497058 73.4556 0.663004 72.3834 5.14625L67.875 23.9986H74.0526Z" fill="white"></path>
                    </g>
                    <defs>
                      <clipPath id="svg-2037166872_1735_clip0_14237_2035">
                        <rect width="101.4" height="24" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg></svg></div>
            </div>
            <div class="flex-none w-10 h-10 relative">
              <div class="will-change-transform content-center justify-center items-center gap-y-20 gap-x-20 flex relative overflow-x-hidden overflow-y-hidden aspect-[1] bg-white w-full h-full rounded-xl">
                <div class="bg-neutral-900 [mask:url(&quot;data:image/svg+xml,&lt;svg%20display=\&quot;block\&quot;%20role=\&quot;presentation\&quot;%20viewBox=\&quot;0%200%2024%2024\&quot;%20xmlns=\&quot;http://www.w3.org/2000/svg\&quot;&gt;&lt;path%20d=\&quot;M%2012%2016%20L%2012%209%20L%2016%209%20L%2016%2016%20Z%20M%206%2016%20L%206%200%20L%2010%200%20L%2010%2016%20Z%20M%200%2016%20L%200%205%20L%204%205%20L%204%2016%20Z\&quot;%20fill=\&quot;var(--1ryvdy4,var(--token-6f1cfa67-1158-449a-89e5-107eb453b2fc,rgb(255,255,255)))\&quot;%20height=\&quot;16px\&quot;%20id=\&quot;Ia6FSEzXG\&quot;%20transform=\&quot;translate(4%204)\&quot;%20width=\&quot;16px\&quot;/&gt;&lt;/svg&gt;&quot;) 50% no-repeat alpha,none] aspect-[1] flex-none w-6 relative"></div>
              </div>
            </div>
          </div>
          <div class="bg-white flex-col flex-none content-start justify-start items-start gap-y-3 gap-x-3 w-full h-min flex relative p-4 rounded-xl">
            <div class="flex-none relative">
              <p class="opacity-0 pointer-events-none select-none text-center tracking-[-0.06em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-6xl font-medium leading-[120%]">120+</p>
              <p class="select-none text-neutral-900 text-center tracking-[-0.06em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-6xl font-medium leading-[120%] absolute inset-0">120+</p>
            </div>
            <div class="outline-0 flex-col justify-start flex flex-none w-full relative">
              <p class="text-neutral-900 tracking-[-0.02em] [text-wrap:balance] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-sm font-medium leading-5 p-0" dir="auto">Collaborating with leading AI and cloud technology providers.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="contents">
        <div class="max-md:flex-none max-md:gap-y-8 max-md:gap-x-8 max-md:w-full bg-zinc-100 flex-col grow shrink-0 basis-0 content-start justify-start items-start gap-y-20 gap-x-20 w-px h-min flex relative p-5 rounded-3xl will-change-transform">
          <div class="flex-col flex-none content-start justify-start items-start gap-y-3 gap-x-3 w-full h-min flex relative">
            <div class="outline-0 flex-col justify-start flex whitespace-pre-wrap [word-break:break-word] [word-wrap:break-word] flex-none w-80 relative">
              <p class="text-neutral-900 tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-sm font-medium leading-5 p-0" dir="auto">Commitment to measurable</p>
            </div>
            <div class="flex-none relative">
              <p class="opacity-0 pointer-events-none select-none text-center tracking-[-0.06em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-4xl font-medium leading-[120%]">100%</p>
              <p class="select-none text-neutral-900 text-center tracking-[-0.06em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-4xl font-medium leading-[120%] absolute inset-0">100%</p>
            </div>
          </div>
          <div class="flex-col flex-none content-start justify-start items-start gap-y-3 gap-x-3 w-full h-min flex relative">
            <div class="flex-none gap-y-0 gap-x-0 w-32 h-10 relative">
              <div class="flex-none w-10 absolute left-0 inset-y-0 will-change-transform">
                <div class="relative after:content-[&quot;&quot;] after:[corner-shape:inherit] after:pointer-events-none after:w-full after:h-full after:absolute after:rounded-[inherit] after:border after:border-solid after:border-white after:left-0 after:top-0 w-full h-full rounded-[100%]">
                  <div class="[corner-shape:inherit] absolute rounded-[inherit] inset-0"><img decoding="auto" width="752" sizes="40px" srcset="https://proxy.extractcss.dev/https://framerusercontent.com/images/LHF5pnTEGiDqPokWO5u1DEp2l0.png?width=752&amp;height=960 752w" src="https://proxy.extractcss.dev/https://framerusercontent.com/images/LHF5pnTEGiDqPokWO5u1DEp2l0.png?width=752&amp;height=960" alt="" class="align-baseline [corner-shape:inherit] object-[center_center] object-cover w-full h-full rounded-[inherit]">
                  </div>
                </div>
              </div>
              <div class="z-[1] flex-none w-10 absolute left-7 inset-y-0 will-change-transform">
                <div class="relative after:content-[&quot;&quot;] after:[corner-shape:inherit] after:pointer-events-none after:w-full after:h-full after:absolute after:rounded-[inherit] after:border after:border-solid after:border-white after:left-0 after:top-0 w-full h-full rounded-[100%]">
                  <div class="[corner-shape:inherit] absolute rounded-[inherit] inset-0"><img decoding="auto" width="752" sizes="40px" srcset="https://proxy.extractcss.dev/https://framerusercontent.com/images/IGOxPIDHI4tPrADWVh1HrKM99RQ.png?width=752&amp;height=960 752w" src="https://proxy.extractcss.dev/https://framerusercontent.com/images/IGOxPIDHI4tPrADWVh1HrKM99RQ.png?width=752&amp;height=960" alt="" class="align-baseline [corner-shape:inherit] object-[center_center] object-cover w-full h-full rounded-[inherit]">
                  </div>
                </div>
              </div>
              <div class="z-[1] flex-none w-10 absolute left-14 inset-y-0 will-change-transform">
                <div class="relative after:content-[&quot;&quot;] after:[corner-shape:inherit] after:pointer-events-none after:w-full after:h-full after:absolute after:rounded-[inherit] after:border after:border-solid after:border-white after:left-0 after:top-0 w-full h-full rounded-[100%]">
                  <div class="[corner-shape:inherit] absolute rounded-[inherit] inset-0"><img decoding="auto" width="752" sizes="40px" srcset="https://proxy.extractcss.dev/https://framerusercontent.com/images/owRvmfck3MmE9RTAPlzhICFlFg.png?width=752&amp;height=960 752w" src="https://proxy.extractcss.dev/https://framerusercontent.com/images/owRvmfck3MmE9RTAPlzhICFlFg.png?width=752&amp;height=960" alt="" class="align-baseline [corner-shape:inherit] object-[center_center] object-cover w-full h-full rounded-[inherit]">
                  </div>
                </div>
              </div>
              <div class="z-[1] flex-none w-10 absolute left-20 inset-y-0 will-change-transform">
                <div class="relative after:content-[&quot;&quot;] after:[corner-shape:inherit] after:pointer-events-none after:w-full after:h-full after:absolute after:rounded-[inherit] after:border after:border-solid after:border-white after:left-0 after:top-0 w-full h-full rounded-[100%]">
                  <div class="[corner-shape:inherit] absolute rounded-[inherit] inset-0"><img decoding="auto" width="752" sizes="40px" srcset="https://proxy.extractcss.dev/https://framerusercontent.com/images/Mjb5QC7cBmKTRevvIPeGBCVzHHM.png?width=752&amp;height=960 752w" src="https://proxy.extractcss.dev/https://framerusercontent.com/images/Mjb5QC7cBmKTRevvIPeGBCVzHHM.png?width=752&amp;height=960" alt="" class="align-baseline [corner-shape:inherit] object-[center_center] object-cover w-full h-full rounded-[inherit]">
                  </div>
                </div>
              </div>
            </div>
            <div class="outline-0 flex-col justify-start flex flex-none w-full max-w-xs relative">
              <p class="text-neutral-900 tracking-[-0.02em] [text-wrap:balance] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base font-medium leading-6 p-0" dir="auto">“Their automation strategy completely reshaped how we work. It’s efficient, intelligent, and seamless.”</p>
            </div>
          </div>
        </div>
      </div>
      <div class="max-md:[align-self:unset] max-md:flex-none max-md:w-full max-md:h-min flex-col grow shrink-0 basis-0 content-start justify-center self-stretch items-start gap-y-6 gap-x-6 w-px flex relative">
        <div class="contents">
          <div class="max-md:flex-none max-md:justify-center max-md:gap-y-3 max-md:gap-x-3 max-md:h-min bg-lime-300 flex-col grow shrink-0 basis-0 content-start justify-between items-start w-full h-px flex relative p-5 rounded-3xl will-change-transform">
            <div class="flex-col flex-none content-start justify-start items-start gap-y-3 gap-x-3 w-72 h-min flex relative rounded-lg">
              <div class="outline-0 flex-col justify-start flex whitespace-pre-wrap [word-break:break-word] [word-wrap:break-word] flex-none w-72 relative">
                <p class="text-neutral-900 tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-sm font-medium leading-5 p-0" dir="auto">Data Points</p>
              </div>
              <div class="flex-none relative">
                <p class="opacity-0 pointer-events-none select-none text-center tracking-[-0.06em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-4xl font-medium leading-[120%]">520k+</p>
                <p class="select-none text-neutral-900 text-center tracking-[-0.06em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-4xl font-medium leading-[120%] absolute inset-0">520k+</p>
              </div>
            </div>
            <div class="outline-0 flex-col justify-start flex flex-none w-full relative">
              <p class="text-neutral-900 tracking-[-0.02em] [text-wrap:balance] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-base font-medium leading-6 p-0" dir="auto">Analyzed monthly to power smarter business strategies.</p>
            </div>
          </div>
        </div>
        <div class="contents">
          <div class="bg-neutral-900 flex-col flex-none content-start justify-start items-start gap-y-32 gap-x-32 w-full h-min flex relative p-5 rounded-3xl will-change-transform">
            <div class="backdrop-blur-[20px] flex-none content-center justify-between items-center w-full h-min flex relative rounded-xl">
              <div class="outline-0 flex-col justify-start flex whitespace-pre flex-none relative">
                <p class="text-white tracking-[-0.02em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-sm font-medium leading-5 p-0" dir="auto">Continents</p>
              </div>
              <div class="flex-none relative">
                <p class="opacity-0 pointer-events-none select-none text-center tracking-[-0.06em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-4xl font-medium leading-[120%]">20+</p>
                <p class="select-none text-white text-center tracking-[-0.06em] [font-family:Plus_Jakarta_Sans,Plus_Jakarta_Sans_Placeholder,sans-serif] text-4xl font-medium leading-[120%] absolute inset-0">20+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
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