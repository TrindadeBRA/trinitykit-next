/**
 * Generated by orval v7.6.0 🍺
 * Do not edit manually.
 * TrinityKitWP API
 * API para criar posts e fazer upload de imagens no WordPress
 * OpenAPI spec version: 1.0.0
 */
import type { GetSegmentSlug200DataItemCategoriesItem } from './getSegmentSlug200DataItemCategoriesItem';

export type GetSegmentSlug200DataItem = {
  /** Nome da linha de produto principal */
  name?: string;
  /** Slug da linha de produto principal */
  slug?: string;
  /** Descrição da linha de produto principal */
  description?: string;
  /** URLs das imagens obrigatórias */
  images?: string[];
  categories?: GetSegmentSlug200DataItemCategoriesItem[];
};
