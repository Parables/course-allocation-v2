// vite.config.ts
import { sveltekit } from "file:///home/parables/Desktop/course-allocation-v2/node_modules/.pnpm/@sveltejs+kit@1.0.0-next.517_svelte@3.52.0+vite@3.1.8/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import svgr from "file:///home/parables/Desktop/course-allocation-v2/node_modules/.pnpm/vite-plugin-svelte-svgr@1.0.4_svelte@3.52.0+vite@3.1.8/node_modules/vite-plugin-svelte-svgr/dist/index.mjs";
var svgoOptions = {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false
        }
      }
    },
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [{ fill: "currentColor" }]
      }
    }
  ]
};
var config = {
  plugins: [
    sveltekit(),
    svgr({
      svgo: svgoOptions
    })
  ]
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wYXJhYmxlcy9EZXNrdG9wL2NvdXJzZS1hbGxvY2F0aW9uLXYyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wYXJhYmxlcy9EZXNrdG9wL2NvdXJzZS1hbGxvY2F0aW9uLXYyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3BhcmFibGVzL0Rlc2t0b3AvY291cnNlLWFsbG9jYXRpb24tdjIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZlbHRlLXN2Z3InO1xuaW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5cblxuY29uc3Qgc3Znb09wdGlvbnMgPSB7XG5cdG11bHRpcGFzczogdHJ1ZSxcblx0cGx1Z2luczogW1xuXHRcdC8vIEVuc3VyaW5nIHZpZXdib3ggaXNuJ3QgcmVtb3ZlZC5cblx0XHR7XG5cdFx0XHRuYW1lOiAncHJlc2V0LWRlZmF1bHQnLFxuXHRcdFx0cGFyYW1zOiB7XG5cdFx0XHRcdG92ZXJyaWRlczoge1xuXHRcdFx0XHRcdHJlbW92ZVZpZXdCb3g6IGZhbHNlXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdHtcblx0XHRcdC8vIHNldHRpbmcgZmlsbCBhdHRyaWJ1dGUgdG8gXCJjdXJyZW50Q29sb3JcIlxuXHRcdFx0bmFtZTogJ2FkZEF0dHJpYnV0ZXNUb1NWR0VsZW1lbnQnLFxuXHRcdFx0cGFyYW1zOiB7XG5cdFx0XHRcdGF0dHJpYnV0ZXM6IFt7IGZpbGw6ICdjdXJyZW50Q29sb3InIH1dXG5cdFx0XHR9XG5cdFx0fVxuXHRdXG59O1xuXG5jb25zdCBjb25maWc6IFVzZXJDb25maWcgPSB7XG5cdHBsdWdpbnM6IFtzdmVsdGVraXQoKVxuLHN2Z3Ioe1xuXHRzdmdvOiBzdmdvT3B0aW9uc1xufSldXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1ULFNBQVMsaUJBQWlCO0FBQzdVLE9BQU8sVUFBVTtBQUlqQixJQUFNLGNBQWM7QUFBQSxFQUNuQixXQUFXO0FBQUEsRUFDWCxTQUFTO0FBQUEsSUFFUjtBQUFBLE1BQ0MsTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLFFBQ1AsV0FBVztBQUFBLFVBQ1YsZUFBZTtBQUFBLFFBQ2hCO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsTUFFQyxNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDUCxZQUFZLENBQUMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUFBLE1BQ3RDO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFDRDtBQUVBLElBQU0sU0FBcUI7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFBQyxVQUFVO0FBQUEsSUFDcEIsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLElBQ1AsQ0FBQztBQUFBLEVBQUM7QUFDRjtBQUVBLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
