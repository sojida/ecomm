FROM ruby:2.5.1

RUN mkdir -p /app

WORKDIR /app
# Copy the Gemfile as well as the Gemfile.lock and install
# the RubyGems. This is a separate step so the dependencies
# will be cached unless changes to one of those two files
# are made.
COPY Gemfile Gemfile.lock ./

RUN gem update --system

RUN gem install bundler -v 2.0.1

ENV BUNDLER_VERSION 2.1

RUN bundler install
# Copy the main application.
COPY . ./
# Expose port 3000 to the Docker host, so we can access it
# from the outside.
EXPOSE 3000
# The main command to run when the container starts. Also
# tell the Rails dev server to bind to all interfaces by
# default.
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]