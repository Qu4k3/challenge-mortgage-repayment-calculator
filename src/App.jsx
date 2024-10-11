import { useState } from 'react'
import { useForm } from "react-hook-form"
import './App.scss'
import ErrorMessage from './components/ErrorMessage'
import IllustrationEmpty from './assets/illustration-empty.svg?react';
import IconCalculator from './assets/icon-calculator.svg?react';

function App() {
  const {
    register,
    watch,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm()

  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(false)


  const watchRadio = watch("radio");

  const mortgageTypes = [
    { id: "repayment", text: "Repayment" },
    { id: "interestOnly", text: "Interest Only" }
  ];

  return (
    <main>
      <section className="first">
        <div>
          <h1>Mortgage Calculator</h1>
          <span onClick={() => reset()}>Clear All</span>
        </div>
        <form>
          <div className='form-group'>
            <label htmlFor="amount">Mortgage Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              pattern="[0-9]*"
              onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
              aria-required="true"
              aria-invalid={errors.amount ? "true" : "false"}
              {...register("amount", {
                required: true
              })}
              className={errors.amount ? "error" : ""}
            />
            <ErrorMessage errors={errors} fieldName="amount" />
          </div>

          <div className='wrapper-columns'>
            <div className='form-group'>
              <label htmlFor="term">Mortgage Term</label>
              <input
                type="number"
                id="term"
                name="term"
                aria-required="true"
                aria-invalid={errors.term ? "true" : "false"}
                {...register("term", {
                  required: true
                })}
                className={errors.term ? "error" : ""}
              />
              <ErrorMessage errors={errors} fieldName="term" />
            </div>

            <div className='form-group'>
              <label htmlFor="rate">Interest Rate</label>
              <input
                type="number"
                id="rate"
                name="rate"
                aria-required="true"
                aria-invalid={errors.rate ? "true" : "false"}
                {...register("rate", {
                  required: true
                })}
                className={errors.rate ? "error" : ""}
              />
              <ErrorMessage errors={errors} fieldName="rate" />
            </div>
          </div>

          <div className='form-group'>
            <p>Mortgage Type</p>
            <div className='wrapper-radio'>
              {mortgageTypes.map((query) => (
                <label key={query.id} htmlFor={query.id} className={watchRadio === query.id ? "active" : ""}>
                  <input
                    type="radio"
                    name="radio"
                    id={query.id}
                    value={query.id}
                    {...register("radio", {
                      required: true
                    })} />
                  {query.text}
                </label>
              ))}
            </div>
            <ErrorMessage errors={errors} fieldName="radio" />
          </div>

          <button type="submit" onClick={() => clearErrors()}>
            <IconCalculator />
            Calculate Repayments
          </button>

        </form>
      </section>
      <section className='last'>
        {result
          ? <div className='result'>

          </div>
          : <div className='empty'>
            <IllustrationEmpty />
            <h3>Results shown here</h3>

            <p>Complete the form and click “calculate repayments” to see what
              your monthly repayments would be.</p>
          </div>
        }
      </section>
    </main>
  )
}

export default App
