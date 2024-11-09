# Testing

This README provides an overview of tests folder.

[[_TOC_]]

## Setup

1. Navigate to the `server` folder.
2. Install the test dependencies using the following command
   `poetry install --without dev`

## Running Tests

To run the tests

1. Navigate to this folder (ie. `server/tests`)
2. use the following command `poetry run pytest`

## File Structure

The file structure of the tests folder mirrors that of the source code. Ideally
Each module in the source code should have a corresponding test file in the
tests folder named `test_<source_file_name>`.

## Naming Convention

Tests should be named in the following format:
`test__<given-input>__<function/module-under-test>__<expected-output>`. For
example, a test that checks if the endpoint `generate_code` returns
status `200` on valid payload, the test should be named as
`test__valid_payload__generate_code_endpoint__status_200_ok`.

## Mocking

All AI models should be mocked, if the test you are writing involves an AI
model, import `tests.global_mocks` before importing the module under test. The
goal of this `tests` folder is to validate the functionality of the code, not
the performance of the model, the tests should run quickly so that the developer
gets immediate feedback. AI performance related tests should be handled by
`server/evaluation` folder.

## Pytest Config

The `server/pyproject.toml` file contains the configuration for pytest. The
`[tool.pytest.ini_options]` section contains the configurations:

### Test Independence

We use `pytest-xdist` to run tests in parallel. This ensures that our tests are
independent and can run simultaneously without any conflicts. The `-n` option
specifies the number of CPUs to use for running tests in parallel. `-n auto`
uses all available CPUs.

### Code Coverage

We aim for 100% code coverage in our tests. We use `pytest-cov` to measure the
code coverage of our tests. The `--cov` option generates a coverage report for
each test, and the `--cov-branch` option checks the branch coverage. you can
also exclude unreachable lines from coverage by commenting `# pragma: no cover`.

The coverage report is generated in the
`server/tests/.pytest_results/coverage_report` folder. Open the `index.html`
file in a browser to view the coverage report.

## Scenarios to Test

1. **Test the happy path** : Test the function with the correct input and check
   if the output is as expected.
2. **Invalid Input Testing** : Test the function with invalid input and check if
   the function raises the expected exception.
3. **Edge Case Testing** : Test the function with edge cases and check if the
   function behaves as expected.

## Best Practices

1. Parametrize tests wherever possible.
2. Don't add redundant tests.
3. Focus beyond code coverage. Try to cover all edge cases.
4. If the input/mock data is too large, move it to a separate file.
