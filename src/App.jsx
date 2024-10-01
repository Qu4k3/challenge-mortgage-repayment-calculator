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
          <span>Clear All</span>
        </div>
        <form>
          <div className='form-group'>
            <label htmlFor="firstName">Mortgage Amount</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              aria-required="true"
              aria-invalid={errors.firstName ? "true" : "false"}
              {...register("firstName", {
                required: true
              })}
              className={errors.firstName ? "error" : ""}
            />
            <ErrorMessage errors={errors} fieldName="firstName" />
          </div>

          <div className='wrapper-columns'>
            <div className='form-group'>
              <label htmlFor="firstName">Mortgage Term</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                aria-required="true"
                aria-invalid={errors.firstName ? "true" : "false"}
                {...register("firstName", {
                  required: true
                })}
                className={errors.firstName ? "error" : ""}
              />
              <ErrorMessage errors={errors} fieldName="firstName" />
            </div>

            <div className='form-group'>
              <label htmlFor="lastName">Interest Rate</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                aria-required="true"
                aria-invalid={errors.lastName ? "true" : "false"}
                {...register("lastName", {
                  required: true
                })}
                className={errors.lastName ? "error" : ""}
              />
              <ErrorMessage errors={errors} fieldName="lastName" />
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
