"use client";
import { useEffect, useCallback } from "react";
import Head from "next/head";
import { Container, Paper, Group, Text, Loader, Image } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ImageIcon from "@/components/common/Icon";

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
  return newURL;
}

// get fbpid from cookie
function getFbPid() {
  if (typeof document === "undefined") return null;
  const fbPid = document.cookie.match(/(^|;) ?_fbp=([^;]*)(;|$)/);
  return fbPid ? fbPid[2] : null;
}

export default function InstallPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation("common");
  const movieId = searchParams.get("movie") || "";
  const language = searchParams.get("language") || "en";

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

  useEffect(() => {
    if (!p0) return;
    // listen click on all page
    const onClick = () => handleDeeplink();
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [p0, handleDeeplink]);

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", movieId, language],
    queryFn: () => fetchMovie(movieId, language),
    enabled: !!movieId && !!language,
  });

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
  ];

  useEffect(() => {
    const language = searchParams.get("language");
    if (
      language &&
      supportedLocales.includes(language) &&
      router.locale !== language
    ) {
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

  return (
    <>
      <Head>
        <title>Idrama AI short video - Install</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/idrama-icon.svg" />
      </Head>
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <Container size="sm" px="md" className="w-full relative z-20">
          {isLoading ? (
            <Group justify="center" style={{ minHeight: "60vh" }}>
              <Loader color="orange" size="xl" />
            </Group>
          ) : isError || !movie ? (
            <Text className="text-white text-center">{t("noMovie")}</Text>
          ) : (
            <Paper className="text-white bg-blue-500 w-full">
              <div className="flex flex-col items-center px-4 pb-10">
                <ImageIcon src="/images/idrama-icon.svg" size={100} />
                <Text className="text-white text-2xl font-bold">iDrama</Text>
                <Text className="text-[#575D61] font-medium"></Text>
                <Text className="font-thin text-gray-200 text-center line-clamp-6 mt-20 text-lg">
                  {movie.description}
                </Text>
              </div>
            </Paper>
          )}
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
