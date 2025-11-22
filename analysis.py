# analysis.py - Data Science Simulation -
import random
import math
import json

class DataAnalyzer:
    def __init__(self, dataset_size=5000):
        self.data = [random.gauss(0, 1) for _ in range(dataset_size)]
        self.processed_data = {}

    def calculate_statistics(self):
        if not self.data:
            return None
        
        mean_val = sum(self.data) / len(self.data)
        variance = sum((x - mean_val) ** 2 for x in self.data) / len(self.data)
        std_dev = math.sqrt(variance)
        
        self.processed_data = {
            "mean": mean_val,
            "variance": variance,
            "std_dev": std_dev,
            "min": min(self.data),
            "max": max(self.data)
        }
        return self.processed_data

    def export_report(self, filename="report.json"):
        with open(filename, "w") as f:
            json.dump(self.processed_data, f, indent=4)
        print(f"Report successfully generated at {filename}")

    def run_simulation(self):
        print("Starting sophisticated data analysis...")
        stats = self.calculate_statistics()
        print(f"Analysis Complete. Mean: {stats['mean']:.4f}")
        self.export_report()

if __name__ == "__main__":
    analyzer = DataAnalyzer(dataset_size=10000)
    analyzer.run_simulation()
