FROM ghcr.io/puppeteer/puppeteer:20.2.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Run the web service on container startup.
CMD [ "node", "index.js" ]
