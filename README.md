## Project Overview

This project is designed to monitor job offers from various sources and provide a consolidated view of available opportunities. The main goal is to help users stay updated with the latest job postings in their field of interest. The monitoring tasks are scheduled using **Trigger.dev**, and the data is stored using **Drizzle** and **Turso** as the database solutions.

## Features

- **Job Scraping**: Automatically scrape job offers from multiple websites using a cron job.
- **Notifications**: Receive email notifications for new job postings.

## Environment Configuration

Before running the project, make sure to fill out the `.env` file with the necessary configuration. An example configuration is provided in the `.example.env` file.

## Job Sources and Processors

The idea behind this project is to monitor job sources, which are URLs where lists of job offers are available. Depending on the company associated with the job source, different processors are used to scrape the job data from the URL. Currently, only a processor for Alten is implemented.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please open an issue or contact me at [yassine.safraoui@grenoble-inp.org].