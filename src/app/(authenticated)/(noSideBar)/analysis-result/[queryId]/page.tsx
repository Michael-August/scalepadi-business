"use client";

import { Input } from "@/components/ui/input";
import {
  Copy,
  Info,
  Key,
  Plus,
  SendHorizontal,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  useCreateChallenge,
  useCreateQueryForChallenge,
  useGetChallengeById,
} from "@/hooks/useChallenge";
import { Button } from "@/components/ui/button";
import { ChatWindowSkeleton } from "@/components/skeletons/messages.skeleton";

interface IMessage {
  key: string;
  content: string;
  role: string;
}

const AnalysisResultPage = () => {
  const [challengeId, setChallengeId] = useState("");
  const [challenge, setChallenge] = useState<any | null>(null);

  const [messages, setMessages] = useState<IMessage[] | null>(null);

  const [input, setInput] = useState("");

  const { createChallenge, isPending: isCreatingChallenge } =
    useCreateChallenge();

  const { queryId } = useParams();

  const { challenge: fetchedChallenge, isLoading } = useGetChallengeById(
    queryId as string
  );

  // 👇 Ref for scrolling
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([
      ...(messages ?? []),
      { role: "user", content: input, key: "" },
    ]);
    setInput("");
    createChallenge(
      {
        queryId: challenge?.queryId,
        description: input,
        decision_maker: challenge?.decision_maker,
        goal: challenge?.goal,
        industry: challenge?.industry,
        revenue_range: challenge?.revenue_range,
        start_timeline: challenge?.start_timeline,
        team_size: challenge?.team_size,
        tools_used: challenge?.tools_used,
        type: challenge?.type,
      },
      {
        onSuccess: (res) => {
          setInput("");
          setMessages((prev) => {
            const newMessages: IMessage[] = [];

            if (res.data?.description) {
              newMessages.push({
                role: "user",
                key: "description",
                content: res.data.description,
              });
            }

            if (res.data?.result?.bottleneck) {
              newMessages.push({
                role: "assistant",
                key: "Bottleneck",
                content: res.data.result.bottleneck,
              });
            }

            if (res.data?.result?.pain_points?.length > 0) {
              newMessages.push({
                role: "assistant",
                key: "Pain points",
                content: res.data.result.pain_points
                  .map((p: string, i: number) => `${i + 1}. ${p}`)
                  .join("\n"),
              });
            }

            if (res.data?.result?.recommendation) {
              newMessages.push({
                role: "assistant",
                key: "Recommendation",
                content: res.data.result.recommendation,
              });
            }

            if (res.data?.result?.recommended_sops?.length > 0) {
              newMessages.push({
                role: "assistant",
                key: "Recommended SOPs",
                content: res.data.result.recommended_sops
                  .map((p: string, i: number) => `${i + 1}. ${p}`)
                  .join("\n"),
              });
            }

            if (res.data?.result?.experts?.length > 0) {
              newMessages.push({
                role: "assistant",
                key: "Expert roles to look for",
                content: res.data.result.experts
                  .map((e: string, i: number) => `${i + 1}. ${e}`)
                  .join("\n"),
              });
            }
            return [...(prev ?? []), ...newMessages];
          });
        },
      }
    );
  };

  const router = useRouter();

  useEffect(() => {
    const storedChallenge = localStorage.getItem("challenge");
    if (storedChallenge) {
      setChallenge(JSON.parse(storedChallenge));

      const challengResult = JSON.parse(storedChallenge);
      setChallengeId(challengResult?.queryId);
    }
  }, []);

  useEffect(() => {
    setMessages((prev) => {
      const newMessages: IMessage[] = [];

      [...(fetchedChallenge?.data ?? [])]
        .reverse()
        .forEach((challenge: any) => {
          if (challenge?.description) {
            newMessages.push({
              role: "user",
              key: "description",
              content: challenge.description,
            });
          }

          if (challenge?.result?.bottleneck) {
            newMessages.push({
              role: "assistant",
              key: "Bottleneck",
              content: challenge.result.bottleneck,
            });
          }

          if (challenge?.result?.pain_points?.length > 0) {
            newMessages.push({
              role: "assistant",
              key: "Pain points",
              content: challenge.result.pain_points
                .map((p: string, i: number) => `${i + 1}. ${p}`)
                .join("\n"),
            });
          }

          if (challenge?.result?.recommendation) {
            newMessages.push({
              role: "assistant",
              key: "Recommendation",
              content: challenge.result.recommendation,
            });
          }

          if (challenge?.result?.recommended_sops?.length > 0) {
            newMessages.push({
              role: "assistant",
              key: "Recommended SOPs",
              content: challenge.result.recommended_sops
                .map((p: string, i: number) => `${i + 1}. ${p}`)
                .join("\n"),
            });
          }

          if (challenge?.result?.experts?.length > 0) {
            newMessages.push({
              role: "assistant",
              key: "Expert roles to look for",
              content: challenge.result.experts
                .map((e: string, i: number) => `${i + 1}. ${e}`)
                .join("\n"),
            });
          }
        });

      return newMessages.filter((msg) => msg.content); // cleanup empty/null
    });
  }, [fetchedChallenge, queryId]);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-[9px] w-full px-4 lg:px-14 py-4">
        <div className="flex flex-col gap-12 w-full lg:w-[900px] py-5 lg:py-10">
          <div
            onClick={() => router.back()}
            className="flex gap-1 items-center cursor-pointer w-fit"
          >
            <Image
              src={"/icons/arrow-left.svg"}
              alt="Arrow left"
              width={16}
              height={16}
            />
            <span className="text-sm text-[#3E4351]">Go back</span>
          </div>

          <div className="flex flex-col gap-3">
            <Image
              src={"/images/scalepadi-ai-logo.svg"}
              alt="ScalePadi AI Logo"
              width={126}
              height={36}
            />
            <span className="font-bold text-xl text-[#0E1426] lg:text-[32px]">
              Here's What We Found
            </span>
            <span className="text-base text-[#1A1A1A] font-normal">
              Our AI analyzed your challenge and highlighted the bottlenecks
              stalling your growth.
            </span>
          </div>

          <div className="border relative border-[#F2F2F2] rounded-3xl p-4 lg:p-6">
            <div className="sticky bg-white top-0 pb-6 mb-3 border-b -mx-4 px-4 lg:-mx-6 lg:px-6 border-[#F2F2F2] flex flex-col gap-1">
              <div className="flex items-center justify-between p-3">
                <span className="text-base font-medium text-primary">
                  Identified growth bottleneck(s)
                </span>
                {/* <span className="w-fit p-2 border border-[#E7E8E9] rounded-[10px] cursor-pointer">Edit</span> */}
              </div>
              <span className="flex items-center gap-1 text-sm text-[#878A93]">
                <Info />
                <span>
                  ScalePadi Ai is chating with you based on the context in the
                  business problem you've provided above
                </span>
              </span>
            </div>
            <div className="max-h-[350px] overflow-y-scroll hide-scrollbar">
              {isLoading && <ChatWindowSkeleton />}
              {!isLoading && fetchedChallenge && (
                <div>
                  {messages?.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${
                        msg.role === "user" ? "items-end" : "items-start"
                      } gap-3 flex-col`}
                    >
                      {msg.role !== "user" && (
                        <span className="text-[#6C6C89] text-sm">
                          {msg.key}
                        </span>
                      )}
                      <div
                        className={`px-4 py-2 rounded-lg max-w-[80%] text-sm shadow-sm mb-4 ${
                          msg.role === "user"
                            ? "bg-[#F7F7F8] text-[#121217]"
                            : "bg-white border border-[#D1DAEC80] text-[#1A1A1A] leading-loose"
                        }`}
                        style={{
                          whiteSpace: "pre-line",
                        }}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {/* Assistant Typing */}
                  {isCreatingChallenge && (
                    <div className="px-4 py-3">
                      <div className="flex space-x-2">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-400"></span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 mb-5">
                    {/* <div className="flex flex-col gap-2">
										<span className="text-sm text-[#1A1A1A]">
											Suggested Experts
										</span>
										<div className="flex items-center"></div>
									</div> */}
                    <Button
                      onClick={() => {
                        router.push(
                          `/business-setup?challengeId=${
                            fetchedChallenge?.data[
                              fetchedChallenge?.data?.length - 1
                            ].queryId
                          }&type=create`
                        );
                      }}
                      className="bg-primary text-white w-fit rounded-[14px] px-4 py-6"
                    >
                      Get Started
                    </Button>
                  </div>

                  {/* Scroll Anchor 👇 */}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            <div className="pt-6 border-t -mx-4 px-4 lg:-mx-6 lg:px-6 border-[#F2F2F2]">
              <div className="flex items-center w-full justify-between bg-[#F7F7F8] py-1 px-[6px]">
                <div className="flex w-full items-center gap-1">
                  <Image
                    src={"/images/scalepadi-ai-logo.svg"}
                    alt="ScalePadi AI Logo"
                    width={126}
                    height={36}
                  />
                  <Plus className="w-6 h-6 text-[#878A93] cursor-pointer" />
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full bg-[#F7F7F8] border-none"
                    autoFocus={true}
                  />
                </div>
                <div
                  onClick={handleSend}
                  className="p-1 rounded-[8px] bg-primary text-white flex items-center cursor-pointer"
                >
                  <SendHorizontal className="-rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultPage;
