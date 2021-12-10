<script>
import { Bar } from 'vue-chartjs';
export default {
	name: 'chartStatus',
	extends: Bar,
	data() {
		return {
			boards: null,
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
					xAxes: [
						{
							ticks: {
								fontSize: 20,
							},
						},
					],
				},
			},
		};
	},
};
</script>
