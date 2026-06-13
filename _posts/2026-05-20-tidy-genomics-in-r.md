---
layout: post
title: "Tidy Genomics: Wrangling Count Data in R"
date: 2026-05-20
categories: [data-science, r]
tags: [r, tidyverse, rnaseq, visualization]
featured: false
---

RNA-seq count matrices arrive wide, messy, and stubbornly un-tidy. This post is a
short tour of reshaping one into a tidy frame so that every downstream plot and
model becomes a one-liner. There is **no cover image and no custom excerpt** here
on purpose — the theme derives a summary from this opening paragraph and skips the
cover gracefully.

## From wide to tidy

A typical counts table has one column per sample and one row per gene. The
tidyverse wants the opposite: one row per observation.

```r
library(tidyverse)

tidy_counts <- counts %>%
  as_tibble(rownames = "gene") %>%
  pivot_longer(
    cols      = -gene,
    names_to  = "sample",
    values_to = "count"
  ) %>%
  left_join(sample_metadata, by = "sample")
```

Once the data is long, grouping and summarising read like sentences:

```r
tidy_counts %>%
  group_by(condition, gene) %>%
  summarise(mean_count = mean(count), .groups = "drop") %>%
  arrange(desc(mean_count))
```

## Why bother

The payoff is that `ggplot2`, `dplyr`, and `tidyr` all speak the same shape. A
faceted expression plot stops being a project and becomes a single call — and the
same frame feeds straight into a model matrix when you are ready to test for
differential expression.

Tidy first; everything after is easier.
