"use client";

import type React from "react";
import { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import DashboardCard from "../../../../atoms/DashboardCard/DashboardCard";
import styles from "./AdminAnalytics.module.scss";

const AdminAnalytics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "daily" | "weekly" | "monthly"
  >("monthly");

  // Dummy data for charts
  const salesData = [
    { date: "Ene", sales: 1200, profit: 400 },
    { date: "Feb", sales: 1500, profit: 550 },
    { date: "Mar", sales: 1300, profit: 450 },
    { date: "Abr", sales: 1700, profit: 600 },
    { date: "May", sales: 1900, profit: 700 },
    { date: "Jun", sales: 2200, profit: 850 },
    { date: "Jul", sales: 2000, profit: 780 },
  ];

  const productCategoryData = [
    { id: "Camisetas", label: "Camisetas", value: 35, color: "#fdd835" },
    { id: "Sudaderas", label: "Sudaderas", value: 25, color: "#ffeb3b" },
    { id: "Pantalones", label: "Pantalones", value: 20, color: "#fbc02d" },
    { id: "Accesorios", label: "Accesorios", value: 10, color: "#f9a825" },
    { id: "Zapatillas", label: "Zapatillas", value: 10, color: "#f57f17" },
  ];

  const customerDemographicsData = [
    { id: "18-24", label: "18-24", value: 40, color: "#4a90e2" },
    { id: "25-34", label: "25-34", value: 30, color: "#5cacee" },
    { id: "35-44", label: "35-44", value: 15, color: "#73bbf7" },
    { id: "45+", label: "45+", value: 15, color: "#8cd0ff" },
  ];

  const baseChartProps = {
    animate: true,
    motionConfig: "stiff" as const,
    theme: {
      axis: {
        domain: { line: { stroke: "#e0e0e0" } },
        ticks: { line: { stroke: "#e0e0e0" }, text: { fill: "#e0e0e0" } },
        legend: { text: { fill: "#e0e0e0" } },
      },
      grid: { line: { stroke: "#222222", strokeDasharray: "4 4" } },
      legends: { text: { fill: "#e0e0e0" } },
      labels: { text: { fill: "#e0e0e0" } },
      tooltip: {
        container: {
          background: "#000000",
          color: "#e0e0e0",
          fontSize: 12,
          borderRadius: 4,
          boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        },
      },
    },
  } as const;

  return (
    <div className={styles.adminAnalytics}>
      <h1 className={styles.pageTitle}>Análisis y Reportes</h1>
      <p className={styles.pageSubtitle}>
        Obtén información clave sobre el rendimiento de tu tienda.
      </p>

      <div className={styles.timeframeSelector}>
        {(["daily", "weekly", "monthly"] as const).map((timeframe) => (
          <button
            key={timeframe}
            className={`${styles.timeframeBtn} ${
              selectedTimeframe === timeframe ? styles.active : ""
            }`}
            onClick={() => setSelectedTimeframe(timeframe)}
          >
            {timeframe === "daily"
              ? "Diario"
              : timeframe === "weekly"
              ? "Semanal"
              : "Mensual"}
          </button>
        ))}
      </div>

      <div className={styles.analyticsGrid}>
        <DashboardCard title="Ventas y Ganancias" className={styles.chartCard}>
          <div className={styles.chartContainer}>
            <ResponsiveLine
              data={[
                {
                  id: "Ventas",
                  data: salesData.map((d) => ({ x: d.date, y: d.sales })),
                },
                {
                  id: "Ganancias",
                  data: salesData.map((d) => ({ x: d.date, y: d.profit })),
                },
              ]}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                stacked: false,
                min: "auto",
                max: "auto",
              }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Mes",
                legendPosition: "middle",
                legendOffset: 40,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Valor",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              colors={["#fdd835", "#4caf50"]} // or your own colors
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              useMesh={true}
              {...baseChartProps}
            />
          </div>
        </DashboardCard>

        <DashboardCard
          title="Productos Más Vendidos"
          className={styles.chartCard}
        >
          <div className={styles.chartContainer}>
            <ResponsiveBar
              data={salesData}
              keys={["sales"]}
              indexBy="date"
              margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
              padding={0.3}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={[styles.accentColor]}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Mes",
                legendPosition: "middle",
                legendOffset: 40,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Ventas",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "colors", modifiers: [["darker", 1.6]] }}
              {...baseChartProps}
            />
          </div>
        </DashboardCard>

        <DashboardCard
          title="Distribución por Categoría"
          className={styles.chartCard}
        >
          <div className={styles.chartContainer}>
            <ResponsivePie
              data={productCategoryData}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor={baseChartProps.theme.labels.text.fill}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
              {...baseChartProps}
            />
          </div>
        </DashboardCard>

        <DashboardCard
          title="Demografía de Clientes"
          className={styles.chartCard}
        >
          <div className={styles.chartContainer}>
            <ResponsivePie
              data={customerDemographicsData}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor={baseChartProps.theme.labels.text.fill}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
              {...baseChartProps}
            />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default AdminAnalytics;
