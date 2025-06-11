"use client";
import { useEffect, useCallback, useState, useRef } from "react";
import Head from "next/head";
import {
  Button,
  Container,
  Paper,
  Group,
  Text,
  Loader,
  Image as MantineImage,
} from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import ImageIcon from "@/components/common/Icon";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useMediaQuery } from "@mantine/hooks";
import animClick from "@/assets/anim-click.json";
import logo from "@/assets/idrama-icon.svg";
import { useLottie } from "lottie-react";
import Image from "next/image";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { logEvent } from "firebase/analytics";
import type { Analytics } from "firebase/analytics";
declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    buildURL?: any;
  }
}
// fetch movie
const fetchMovie = async (movieId: string, languageCode: string) => {
  const res = await fetch(
    `https://short-movie.begamob.com/api/v2/movies/${movieId}/field`,
    {
      headers: {
        accept: "*/*",
        "language-code": languageCode,
      },
    }
  );
  if (!res.ok) throw new Error("Network response was not ok");
  const result = await res.json();
  return result.data;
};

export default function MoviePage({
  movie,
  isError,
}: {
  movie: any;
  isError: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation("common");
  const movieId = searchParams.get("movie") || "";
  const language = searchParams.get("language") || "en";
  const isMd = useMediaQuery("(min-width: 768px)");
  const analyticsRef = useRef<Analytics | null>(null);

  // firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyAqEYAC1isVQRHf8q9LRwKxPARVsWvn9jE",
    authDomain: "tracking-event-server-adjust.firebaseapp.com",
    projectId: "tracking-event-server-adjust",
    storageBucket: "tracking-event-server-adjust.firebasestorage.app",
    messagingSenderId: "911004696184",
    appId: "1:911004696184:web:718e5eb907ea877c44f78d",
    measurementId: "G-79HK0D6V8X",
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Khởi tạo analytics
    const app = initializeApp(firebaseConfig);
    analyticsRef.current = getAnalytics(app);
  }, []);
  console.log(analyticsRef.current, "analytics");

  // build deeplink URL
  function buildURL(
    p0: string | null,
    p1: string | null,
    p2: string | null,
    p3: string | null,
    p4: string | null,
    p5: string | null,
    p6: string | null,
    fbclid: string | null,
    fbpid: string | null
  ) {
    if (!p0) return null;
    const tracker_token = p0;
    const campaign = p1 || p2 ? `${p1 || ""}(${p2 || ""})` : "";
    const adgroup = p3 || p4 ? `${p3 || ""}(${p4 || ""})` : "";
    const creative = p5 || p6 ? `${p5 || ""}(${p6 || ""})` : "";
    fbclid = fbclid || "";
    fbpid = fbpid || "";
    const params: Record<string, string> = {
      campaign,
      adgroup,
      creative,
      fbclid,
      fbpid,
    };

    const newURL =
      "https://app.adjust.com/" +
      tracker_token +
      "?" +
      Object.keys(params)
        .map((key) => key + "=" + encodeURIComponent(params[key]))
        .join("&");
    console.log(analyticsRef.current, "analytics");
    if (!analyticsRef.current) return newURL;
    console.log("logEvent");
    logEvent(analyticsRef.current, "link_click", {
      link_url: newURL,
      fbpid: fbpid,
      fbcid: fbclid,
    });
    return newURL;
  }

  // get fbpid from cookie
  function getFbPid() {
    if (typeof document === "undefined") return null;
    const fbPid = document.cookie.match(/(^|;) ?_fbp=([^;]*)(;|$)/);
    return fbPid ? fbPid[2] : null;
  }

  // get params of deeplink
  const p0 = searchParams.get("p0");
  const p1 = searchParams.get("p1");
  const p2 = searchParams.get("p2");
  const p3 = searchParams.get("p3");
  const p4 = searchParams.get("p4");
  const p5 = searchParams.get("p5");
  const p6 = searchParams.get("p6");
  const fbclid = searchParams.get("fbclid");

  // Handler deeplink click
  const handleDeeplink = useCallback(() => {
    const fbpid = getFbPid();
    const deeplink = buildURL(p0, p1, p2, p3, p4, p5, p6, fbclid, fbpid);
    if (deeplink) {
      window.location.href = deeplink;
    }
  }, [p0, p1, p2, p3, p4, p5, p6, fbclid]);

  // useEffect(() => {
  //   if (!p0) return;
  //   // listen click on all page
  //   const onClick = () => handleDeeplink();
  //   window.addEventListener("click", onClick);
  //   return () => {
  //     window.removeEventListener("click", onClick);
  //   };
  // }, [p0, handleDeeplink]);

  const copyToClipBoard = () => {
    const episodeIndex = searchParams.get("episode") || "";
    navigator.clipboard.writeText(
      JSON.stringify({
        movie_id: +movieId,
        episode: +episodeIndex,
        language: language,
      })
    );
    if (!p0) return;
    handleDeeplink();
  };

  useEffect(() => {
    if (router.locale !== language) {
      router.replace(router.asPath, undefined, { locale: language });
    }
  }, [language, router]);

  const supportedLocales = [
    "en",
    "es",
    "ja",
    "in",
    "fr",
    "pt",
    "th",
    "de",
    "ko",
    "tr",
    "vi",
  ];

  useEffect(() => {
    const language = searchParams.get("language");
    if (
      language &&
      supportedLocales.includes(language) &&
      router.locale !== language
    ) {
      const params = searchParams.toString();
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query },
        },
        undefined,
        { locale: language }
      );
    }
  }, [searchParams, router.locale]);

  useEffect(() => {
    if (!analyticsRef.current) return;
    // Lấy params từ URL

    const userAgent = navigator.userAgent || navigator.vendor;
    let platform = /iPad|iPhone|iPod/.test(userAgent) ? "ios" : "android";
    logEvent(analyticsRef.current, "access_page", {
      movie_id: movieId,
      episode: searchParams.get("episode"),
      languageMovie: language,
      platform: platform,
    });
    logEvent(analyticsRef.current, "movie_info", {
      movie_id: movieId,
      episode: searchParams.get("episode"),
      languageMovie: language,
      platform: platform,
    });
  }, [analyticsRef.current, movieId, language]);

  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.fbq) {
  //     const params = new URLSearchParams(window.location.search);
  //     const movieId = params.get("movie");
  //     if (movieId) {
  //       window.fbq("trackCustom", "ViewMovie", { movieId });
  //     }
  //   }
  // }, [movieId]);

  const defaultOptions = {
    animationData: animClick,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(defaultOptions, {
    width: 200,
    height: 200,
  });

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/idrama-icon.svg" />
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
        {/* Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !(function(f,b,e,v,n,t,s){
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '1353122409468442');
              fbq('track', 'PageView');
              console.log(fbq, "fbq");
              window.addEventListener('load', function() {
                var search = window.location.search;
                var movieId = null;
                if (search) {
                  var params = new URLSearchParams(search);
                  movieId = params.get('movie');
                }
                if (movieId) {
                  fbq('trackCustom', 'ViewMovie', { movieId: movieId });
                }
              });
            `,
          }}
        />
        {/* Meta Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1353122409468442&ev=PageView&noscript=1"
            alt="fb-pixel"
          />
        </noscript>
      </Head>
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0)", // trong suốt
            cursor: "pointer",
          }}
          onClick={copyToClipBoard}
        >
          {/* Có thể thêm hướng dẫn ở đây nếu muốn */}
        </div>
        {movie && (
          <MantineImage
            src={movie.posterUrl}
            alt="poster-bg"
            className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 z-0"
            style={{ filter: "blur(6px)", objectFit: "cover" }}
          />
        )}
        <div className="absolute inset-0 bg-black/70 z-10" />
        <Container size="sm" px="md" className="w-full relative z-20">
          {isError ? (
            <Text className="text-white text-center">{t("noMovie")}</Text>
          ) : !movie ? (
            <Group justify="center" style={{ minHeight: "60vh" }}>
              <Loader color="orange" size="xl" />
            </Group>
          ) : (
            <Paper className="text-white">
              {isMd ? (
                <div className="flex flex-col items-center px-4 pb-10">
                  <div className="flex flex-row gap-2 py-5 mb-10">
                    <ImageIcon src="/images/idrama-icon.svg" size={36} />
                    <Text className="text-white text-2xl font-bold">
                      iDrama AI Short Videos
                    </Text>
                  </div>
                  <div className="flex flex-row gap-4 items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <MantineImage
                        src={movie.posterUrl}
                        alt="poster"
                        className="md:w-2/3 border-2 border-white rounded-2xl mb-4 max-w-[30vw]"
                      />
                      {/* {movie && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                          <ImageIcon src="/images/play-icon.svg" size={64} />
                        </div>
                      )} */}
                    </div>
                    <div className="flex flex-col items-start justify-center w-[35%] gap-6 text-left">
                      <Text className="text-left my-4 text-xl font-bold text-white">
                        {movie.title}
                      </Text>
                      <Text className="font-thin text-gray-200 text-left line-clamp-6">
                        {movie.description}
                      </Text>
                      <Button
                        fullWidth
                        className="cta-button AdjustTracker text-white p-4 rounded-full w-full z-50"
                        style={{
                          background:
                            "linear-gradient(90deg, #fb3c38 0%, #f66f1b 100%)",
                          maxWidth: "calc(100% - 25px)",
                        }}
                        onClick={copyToClipBoard}
                      >
                        <span className="relative w-full text-center">
                          {t("continueWatching")}
                        </span>
                        <span
                          className="absolute right-0 top-1/2 -translate-y-1/3"
                          style={{ pointerEvents: "none" }}
                        >
                          {View}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center px-4 pb-28">
                  <div className="flex flex-row gap-2 py-5">
                    <Image src={logo} alt="logo" width={36} height={36} />
                    <Text className="text-white text-2xl font-bold">
                      iDrama
                    </Text>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <MantineImage
                      src={movie.posterUrl}
                      alt="poster"
                      className="md:w-2/3 border-2 border-white rounded-2xl mb-4 w-4/5 "
                    />
                    {/* {movie && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <ImageIcon src="/images/play-icon.svg" size={64} />
                      </div>
                    )} */}
                  </div>
                  <Text className="text-center my-4 text-xl font-bold text-white">
                    {movie.title}
                  </Text>
                  <Text className="font-thin text-gray-200 text-center ">
                    {movie.description}
                  </Text>
                </div>
              )}
              {!isMd && (
                <Button
                  fullWidth
                  size="lg"
                  radius="xl"
                  className="fixed flex items-center justify-center bottom-10 left-1/2 -translate-x-1/2 cta-button AdjustTracker text-white p-4 rounded-full w-full z-50"
                  style={{
                    background:
                      "linear-gradient(90deg, #fb3c38 0%, #f66f1b 100%)",
                    maxWidth: "calc(100% - 25px)",
                    overflow: "visible",
                  }}
                  onClick={copyToClipBoard}
                >
                  <span className="relative w-full text-center text-xl font-bold">
                    {t("continueWatching")}
                  </span>
                  <span
                    className="absolute right-[-10px] top-1/2 -translate-y-1/3"
                    style={{ pointerEvents: "none" }}
                  >
                    {View}
                  </span>
                </Button>
              )}
            </Paper>
          )}
        </Container>
      </div>
    </>
  );
}

export async function getServerSideProps({
  query,
  locale,
}: {
  query: any;
  locale: string;
}) {
  const movieId = query.movie || "";
  const language = query.language || locale || "en";
  let movie = null;
  let isError = false;
  if (movieId && language) {
    try {
      movie = await fetchMovie(movieId, language);
    } catch (e) {
      isError = true;
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      movie,
      isError,
    },
  };
}
