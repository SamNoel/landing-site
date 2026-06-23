!(function () {
  let e = !1,
    t = !1,
    n = !1;
  function a(e) {
    return new Promise((t, n) => {
      const a = document.createElement("script");
      ((a.src = e),
        (a.async = !0),
        (a.onload = () => t()),
        (a.onerror = () => n(new Error(`Failed to load script: ${e}`))),
        document.body.appendChild(a));
    });
  }
  function o() {
    const t = document.querySelectorAll('[data-captcha="true"]');
    if (t.length && !e) {
      const a = document.querySelector('script[src*="hcaptcha.com"]');
      if (a) {
        if (a.src.includes("recaptchacompat=off")) return void (e = !0);
        a.remove();
      }
      let o = null,
        i = null,
        r = null;
      t.forEach(function (e) {
        const t = e.dataset.sitekey;
        ((o = e.dataset.lang),
          (i = e.dataset.onload),
          (r = e.dataset.render),
          t || (e.dataset.sitekey = "50b2fe65-b00b-4b9e-ad62-3ba471098be2"));
      });
      let l = "https://js.hcaptcha.com/1/api.js?recaptchacompat=off";
      (o && (l += `&hl=${o}`),
        i && (l += `&onload=${i}`),
        r && (l += `&render=${r}`));
      var n = document.createElement("script");
      ((n.type = "text/javascript"),
        (n.async = !0),
        (n.defer = !0),
        (n.src = l),
        document.body.appendChild(n));
    }
    e = !0;
  }
  function i() {
    const e = document.querySelectorAll('[data-fileupload="true"]');
    if (e.length && !t) {
      let t;
      t = "undefined" != typeof jQuery;
      const n = t ? "uploadcare.min.js" : "uploadcare.full.min.js";
      let a = document.createElement("script");
      ((a.type = "text/javascript"),
        (a.async = !0),
        (a.defer = !0),
        (a.src = `https://ucarecdn.com/libs/widget/3.x/${n}`),
        document.body.appendChild(a));
      const o = `.uploadcare--widget__button.uploadcare--widget__button_type_open {\nbackground-color: ${e[0].dataset.backgroundColor || "#2a2a2a"};\ncolor: ${e[0].dataset.textColor || "#FFFFFF"};\n}`;
      let i = document.createElement("style");
      ((i.textContent = o),
        document.head.appendChild(i),
        a.addEventListener("load", function () {
          e.forEach(function (e) {
            e.setAttribute("name", "attachment");
            let t = uploadcare.Widget(e, {
              publicKey: "a0e4fd45fb9d5fed7599",
              systemDialog: !0,
            });
            var n;
            e.dataset.maxsize &&
              t.validators.push(
                ((n = 1024 * parseInt(e.dataset.maxsize) * 1024),
                function (e) {
                  if (null !== e.size && e.size > n)
                    throw new Error("fileMaximumSize");
                }),
              );
          });
        }));
      const r = e[0].dataset.buttonText;
      UPLOADCARE_LOCALE_TRANSLATIONS = {
        errors: {
          fileMinimalSize: "File is too small",
          fileMaximumSize: "File is too large",
        },
        buttons: {
          choose: { files: { ...(r && { one: r }), ...(r && { other: r }) } },
        },
      };
    }
    t = !0;
  }
  function r(e, t, n) {
    return new Promise((a, o) => {
      const i = new FormData();
      (Object.entries(t.fields).forEach(([e, t]) => {
        i.append(e, t);
      }),
        i.append("file", e));
      const l = new XMLHttpRequest();
      (l.open("POST", t.url, !0),
        l.upload.addEventListener("progress", (e) => {
          e.lengthComputable && n && n(!0, e.loaded, e.total);
        }),
        (l.onload = () => {
          l.status >= 200 && l.status < 300
            ? a(t.key)
            : o(new Error("Upload failed"));
        }),
        (l.onerror = () => o(new Error("Upload failed"))),
        l.send(i),
        (r.currentXhr = l));
    });
  }
  function l() {
    const e = document.querySelectorAll(
      'input[type="file"][data-advanced="true"]',
    );
    "undefined" != typeof FilePond
      ? ("undefined" != typeof FilePondPluginFileValidateSize &&
          FilePond.registerPlugin(FilePondPluginFileValidateSize),
        "undefined" != typeof FilePondPluginFileValidateType &&
          FilePond.registerPlugin(FilePondPluginFileValidateType),
        e.forEach(function (e) {
          e.setAttribute("name", "attachment");
          let t = e.getAttribute("data-max-file-size");
          if (t) {
            parseInt(t) > 100 && (t = "100MB");
          }
          const n = e.getAttribute("accept")
              ? e.getAttribute("accept").split(",")
              : [],
            a = parseInt(e.getAttribute("data-max-files")) || 3;
          let o = e.getAttribute("data-content");
          const i = (function (e) {
            const t = e.getAttribute("data-form-id");
            if (
              t &&
              /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                t,
              )
            )
              return t;
            const n = e.closest("form");
            if (!n) return null;
            const a = n.querySelector('input[name="access_key"]');
            if (a && a.value) {
              const e = a.value;
              if (
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                  e,
                )
              )
                return e;
            }
            const o = n.getAttribute("action");
            if (o) {
              const e = o.match(
                /api\.web3forms\.com\/submit\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i,
              );
              if (e && e[1]) return e[1];
            }
            return (
              console.warn(
                "Web3Forms: Access Key or Form ID is required for advanced file upload. Please add a data-form-id attribute to avoid interruption in the future.",
              ),
              null
            );
          })(e);
          FilePond.create(e, {
            ...(o && { labelIdle: o }),
            maxFileSize: t || "25MB",
            acceptedFileTypes: n,
            maxFiles: a,
            credits: !1,
            server: {
              process: (e, t, n, a, o, l, d) => (
                (function (e, t) {
                  const n = new URLSearchParams({ file: e.name });
                  return (
                    e.type && n.append("type", e.type),
                    t && n.append("id", t),
                    fetch(`https://api.web3forms.com/upload?${n}`).then((e) =>
                      e.json(),
                    )
                  );
                })(t, i)
                  .then((e) => r(t, e, l))
                  .then((e) => a(e))
                  .catch((e) => {
                    (console.error("Upload error:", e),
                      o("Error uploading file"));
                  }),
                {
                  abort: () => {
                    (r.currentXhr && r.currentXhr.abort(), d());
                  },
                }
              ),
            },
          });
        }),
        document.addEventListener("FilePond:warning", () => {
          alert("Error! Maximum number of files exceeded!");
        }))
      : setTimeout(l, 100);
  }
  function d() {
    var e;
    document.querySelectorAll('input[type="file"][data-advanced="true"]')
      .length &&
      !n &&
      (Promise.all([
        ((e = "https://unpkg.com/filepond/dist/filepond.min.css"),
        new Promise((t, n) => {
          let a = document.createElement("link");
          ((a.rel = "stylesheet"),
            (a.href = e),
            (a.onload = () => t()),
            (a.onerror = () => n(new Error("Failed to load CSS"))),
            document.head.appendChild(a));
        })),
        a(
          "https://unpkg.com/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.min.js",
        ),
        a(
          "https://unpkg.com/filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.min.js",
        ),
        a("https://unpkg.com/filepond@4/dist/filepond.min.js"),
      ])
        .then(() => l())
        .catch((e) => {
          console.error("Error loading FilePond or plugins:", e);
        }),
      (n = !0));
  }
  (o(),
    i(),
    d(),
    window.addEventListener("pageshow", function (e) {
      e.persisted && (o(), i(), d());
    }));
})();
