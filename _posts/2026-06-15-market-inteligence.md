---
layout: post
title: "IVD Radar — Inteligência de mercado sem afogamento em ruído"
date: 2026-06-16 22:16:56 -0300
categories: [python, products, newsletter, llm, ai, data science]
tags: [python, AI, data engineering, serverless, health]
excerpt: "Um analista de mercado que não dorme, não pede aumento e não cai no efeito manada da imprensa."
image: /assets/images/mkthealth.png
status: "Em produção · repositório privado"
live_url: "https://t.me/MercadoSaudeNews/2"
---

### PT

# IVD Radar

**Um analista sênior que não dorme, não pede aumento e não cai no efeito manada da imprensa.**

Agente de IA que faz curadoria, pontuação e sumarização de notícias corporativas, artigos científicos e cenário macroeconômico, entregando relatórios executivos direto num grupo do Telegram. Focado em Diagnóstico In Vitro (IVD) e Saúde Suplementar, mas a arquitetura não se importa com o domínio.

---

## O problema

Acompanhar o mercado de IVD significa, na prática, ler a mesma notícia reescrita por seis portais, garimpar um balanço relevante no meio de vinte press releases sobre "parcerias estratégicas", e ainda fingir que leu a newsletter macroeconômica que chegou às 6h. São horas por semana e uma atenção que ninguém tem sobrando.

A informação não falta. Falta sinal no meio do ruído.

## A solução

O IVD Radar faz a curadoria que um analista júnior faria, só que em minutos, de graça e sem reclamar. Ele coleta notícias, artigos científicos e contexto macro, **pontua o que importa, descarta o barulho**, resume com um LLM e entrega um relatório executivo categorizado num grupo do Telegram. Na cadência que você configurar.

## Como funciona

Pipeline modular em Python, cada peça com uma responsabilidade única:


- **sources** — a coleta. Feeds RSS (Google News, newsletters) e API do PubMed para os dados brutos.


- **dedupe** — o curador. Limpa texto, remove duplicatas exatas e semânticas, e aplica o sistema de pontuação por palavra-chave que rankeia o que é realmente relevante.


- **summarize** — o analista. Extrai o conteúdo completo das URLs vencedoras (via Jina Reader) e gera o relatório categorizado com um LLM — Mercado, Inovação, Ciência e Macroeconomia.


- **telegram_send** — o carteiro. Formata em HTML e fatia o relatório para respeitar o limite de 4096 caracteres do Telegram, porque o Telegram não perdoa.


- **run_weekly** — o maestro. Orquestra tudo.

Roda **100% serverless via GitHub Actions**. Custo de infraestrutura: zero. Servidor para manter acordado de madrugada: nenhum.

## Decisões de engenharia que valeram a pena

**Pontuar antes de resumir.** Mandar tudo para o LLM é caro e lento. O bot pontua primeiro e só promove ao resumo o que passa da régua. Economiza tokens e a paciência de quem lê.

**Deduplicação semântica.** Quando três portais publicam "Empresa X adquire Y" com títulos ligeiramente diferentes, comparação exata não pega nada. A comparação semântica pega e mata o efeito manada da imprensa antes que ele entupa o relatório.

**Contexto macro invisível.** O bot lê newsletters de mercado para captar o "humor" do dia (juros, inflação) e usa isso como pano de fundo. Notícia setorial sem contexto macro é fofoca; com contexto é análise.

**Separar ciência de marketing.** A integração com o PubMed busca inovação real em point-of-care direto na fonte científica, sem passar pelo filtro otimista dos releases corporativos.

## Resultado

Em produção, entregando relatórios automaticamente para um grupo real de profissionais de saúde no Telegram. A arquitetura é **agnóstica a domínio**: migrar de "Saúde Suplementar" para "Equity Research", "Cripto" ou "Agro" é questão de editar três arquivos de configuração — queries, palavras-chave e o prompt do analista — e não de reescrever código.

## Stack

* Python · GitHub Actions (serverless) · LLM (Groq / Gemini) · Jina Reader · API do PubMed · Telegram Bot API

## Status

Repositório **privado**. É um produto, não um exercício de fim de semana. Demo ao vivo disponível no Telegram.

## [Entre no grupo →](https://t.me/MercadoSaudeNews/2)

### EN

# IVD Radar

**A senior analyst who doesn't sleep, doesn't ask for a raise, and doesn't fall for the press herd effect.**

An AI agent that curates, scores, and summarizes corporate news, scientific articles, and macroeconomic scenarios, delivering executive reports straight to a Telegram group. Focused on In Vitro Diagnostics (IVD) and Private Healthcare, but the architecture is domain-agnostic.

---

## The problem

Keeping up with the IVD market means, in practice, reading the same news rewritten by six portals, digging up a relevant balance sheet amidst twenty press releases about "strategic partnerships," and still pretending to have read the macroeconomic newsletter that arrived at 6 AM. That means hours per week and an attention span nobody has to spare.

Information isn't lacking. What's lacking is signal amidst the noise.

## The solution

IVD Radar does the curation a junior analyst would do, except in minutes, for free, and without complaining. It collects news, scientific articles, and macro context, **scores what matters, discards the noise**, summarizes it with an LLM, and delivers a categorized executive report to a Telegram group. At whatever cadence you configure.

## How it works

A modular Python pipeline, where each piece has a single responsibility:

* **sources** — the collection. RSS feeds (Google News, newsletters) and the PubMed API for raw data.
* **dedupe** — the curator. Cleans text, removes exact and semantic duplicates, and applies a keyword scoring system that ranks what is truly relevant.
* **summarize** — the analyst. Extracts the full content from the winning URLs (via Jina Reader) and generates the categorized report with an LLM — Market, Innovation, Science, and Macroeconomics.
* **telegram_send** — the mailman. Formats in HTML and slices the report to respect Telegram's 4096-character limit, because Telegram is unforgiving.
* **run_weekly** — the maestro. Orchestrates everything.

Runs **100% serverless via GitHub Actions**. Infrastructure cost: zero. Servers to keep awake at dawn: none.

## Engineering decisions that paid off

**Score before summarizing.** Sending everything to the LLM is expensive and slow. The bot scores first and only promotes to the summary what makes the cut. It saves tokens and the reader's patience.

**Semantic deduplication.** When three portals publish "Company X acquires Y" with slightly different titles, exact matching catches nothing. Semantic matching catches it and kills the press herd effect before it clogs up the report.

**Invisible macro context.** The bot reads market newsletters to capture the "mood" of the day (interest rates, inflation) and uses that as a backdrop. Sector news without macro context is gossip; with context, it's analysis.

**Separating science from marketing.** The PubMed integration searches for real point-of-care innovation straight at the scientific source, without passing through the optimistic filter of corporate press releases.

## Result

In production, delivering reports automatically to a real group of healthcare professionals on Telegram. The architecture is **domain-agnostic**: migrating from "Private Healthcare" to "Equity Research", "Crypto", or "Agribusiness" is a matter of editing three configuration files — queries, keywords, and the analyst's prompt — rather than rewriting code.

## Stack

* Python · GitHub Actions (serverless) · LLM (Groq / Gemini) · Jina Reader · PubMed API · Telegram Bot API

## Status

Repository is **private**. It's a product, not a weekend exercise. Live demo available on Telegram.

## [Join the group →](https://t.me/MercadoSaudeNews/2)